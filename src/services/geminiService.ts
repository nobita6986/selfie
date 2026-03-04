import { GoogleGenAI } from "@google/genai";
import { ApiConfig, AppConfig, ModelId } from "../types";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

// Helper to strip base64 prefix
const stripBase64 = (base64: string) => {
  return base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
};

// Helper to validate a key (simple ping)
export const validateApiKey = async (key: string): Promise<boolean> => {
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    // Use a lightweight model for pinging
    await ai.models.generateContent({
      model: "gemini-2.5-flash-latest",
      contents: "ping",
    });
    return true;
  } catch (e) {
    console.error("Key validation failed:", e);
    return false;
  }
};

export const generateMirrorSelfie = async (
  appConfig: AppConfig,
  apiConfig: ApiConfig,
  onProgress: (progress: number) => void
): Promise<{ imageUrl: string; nextKeyIndex: number }> => {
  let attempts = 0;
  const maxAttempts = Math.max(apiConfig.keys.length * 2, 5); // Try each key at least twice or 5 times total
  let currentKeyIndex = apiConfig.activeKeyIndex;

  // Construct Prompt
  const posePrompt = appConfig.holdingPhone
    ? "STRICT REQUIREMENT: This is a MIRROR SELFIE. The person MUST be holding a smartphone in their hand. The phone MUST be clearly visible in the mirror reflection. Position the phone at chest or waist level so it does not block the face. The hand holding the phone must be visible."
    : "A natural posing shot in front of a mirror. The person is standing naturally, hands in pockets or hanging loosely. NO phone is visible. The person is NOT holding a phone.";

  const corePrompt = `
    Generate a high-quality, realistic 1080p mirror selfie photo.
    
    Input 1: Face/Head reference (Identity).
    Input 2: Outfit/Clothing reference.
    
    Task: Swap the face from Input 1 and the outfit from Input 2 onto a person in the target scene.
    
    Scene: ${appConfig.scene}.
    Pose: ${posePrompt}
    
    Details:
    - Preserve the facial features from Input 1 exactly.
    - Preserve the clothing details from Input 2 exactly.
    - Lighting: Natural, flattering indoor lighting suitable for the scene.
    - Quality: Photorealistic, 8k, highly detailed, social media influencer style.
    - CRITICAL: If the pose is a mirror selfie, the smartphone and the hand holding it MUST be generated and visible.
    ${appConfig.additionalPrompt ? `- Additional Requirements: ${appConfig.additionalPrompt}` : ""}
  `;

  while (attempts < maxAttempts) {
    try {
      const currentKey = apiConfig.keys.length > 0 
        ? apiConfig.keys[currentKeyIndex] 
        : process.env.GEMINI_API_KEY;
      
      // If we have keys configured but the index is invalid, reset to 0
      if (apiConfig.keys.length > 0 && !currentKey) {
          currentKeyIndex = 0;
          continue;
      }

      const ai = new GoogleGenAI({ apiKey: currentKey });
      
      onProgress(10 + Math.min(attempts * 5, 20)); // Fake progress update

      const parts = [
        { text: corePrompt },
        {
          inlineData: {
            mimeType: "image/png",
            data: stripBase64(appConfig.kocImage!),
          },
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: stripBase64(appConfig.outfitImage!),
          },
        },
      ];

      onProgress(40);

      // Call API
      const response = await ai.models.generateContent({
        model: apiConfig.activeModel,
        contents: { parts },
        config: {
            // @ts-ignore
            imageConfig: {
                aspectRatio: "9:16",
            }
        }
      });

      onProgress(90);

      const candidate = response.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find((p: any) => p.inlineData);

      if (imagePart && imagePart.inlineData) {
        onProgress(100);
        return {
            imageUrl: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
            nextKeyIndex: currentKeyIndex // Return the index that worked
        };
      } else {
        throw new Error("No image data in response");
      }

    } catch (error: any) {
      console.error(`Attempt ${attempts + 1} failed with key index ${currentKeyIndex}:`, error);
      
      // Handle 429 (Quota Exceeded)
      if (error.message?.includes("429") || error.status === 429) {
        console.warn("Quota exceeded (429).");
        
        if (apiConfig.keys.length > 1) {
            // Rotate to next key immediately
            console.log("Rotating to next key...");
            currentKeyIndex = (currentKeyIndex + 1) % apiConfig.keys.length;
        } else {
            // Wait if we only have one key (or using env)
            console.log("Waiting before retry...");
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
      } 
      // Handle 403 (Permission Denied / Billing)
      else if (error.message?.includes("403") || error.status === 403) {
        // If we have multiple keys, maybe this specific key is bad/unbilled?
        if (apiConfig.keys.length > 1) {
            console.warn("Permission denied (403). Rotating key...");
            currentKeyIndex = (currentKeyIndex + 1) % apiConfig.keys.length;
        } else {
            throw new Error("Permission Denied (403). Please check if Billing is enabled for this project/API Key.");
        }
      }
      else {
        // Other errors - maybe transient?
        // If it's a 500 or network error, retry.
        // If it's a 400 (Bad Request), throw immediately.
        if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429 && error.status !== 403) {
            throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      attempts++;
    }
  }

  throw new Error("Failed to generate image after multiple attempts. Please check your API keys and quota.");
};

export const editImage = async (
  base64Image: string,
  editPrompt: string,
  apiConfig: ApiConfig,
  onProgress: (progress: number) => void
): Promise<{ imageUrl: string; nextKeyIndex: number }> => {
  let attempts = 0;
  const maxAttempts = Math.max(apiConfig.keys.length * 2, 5);
  let currentKeyIndex = apiConfig.activeKeyIndex;

  while (attempts < maxAttempts) {
    try {
      const currentKey = apiConfig.keys.length > 0 
        ? apiConfig.keys[currentKeyIndex] 
        : process.env.GEMINI_API_KEY;
      
      if (apiConfig.keys.length > 0 && !currentKey) {
          currentKeyIndex = 0;
          continue;
      }

      const ai = new GoogleGenAI({ apiKey: currentKey });
      
      onProgress(20);

      const parts = [
        {
          inlineData: {
            mimeType: "image/png",
            data: stripBase64(base64Image),
          },
        },
        { text: editPrompt },
      ];

      onProgress(50);

      const response = await ai.models.generateContent({
        model: apiConfig.activeModel,
        contents: { parts },
      });

      onProgress(90);

      const candidate = response.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find((p: any) => p.inlineData);

      if (imagePart && imagePart.inlineData) {
        onProgress(100);
        return {
            imageUrl: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
            nextKeyIndex: currentKeyIndex
        };
      } else {
        throw new Error("No image data in response");
      }

    } catch (error: any) {
      console.error(`Edit attempt ${attempts + 1} failed with key index ${currentKeyIndex}:`, error);
      
      if (error.message?.includes("429") || error.status === 429) {
        if (apiConfig.keys.length > 1) {
            currentKeyIndex = (currentKeyIndex + 1) % apiConfig.keys.length;
        } else {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
      } else if (error.message?.includes("403") || error.status === 403) {
        if (apiConfig.keys.length > 1) {
            currentKeyIndex = (currentKeyIndex + 1) % apiConfig.keys.length;
        } else {
            throw new Error("Permission Denied (403). Please check if Billing is enabled.");
        }
      } else {
        if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429 && error.status !== 403) {
            throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      attempts++;
    }
  }

  throw new Error("Failed to edit image after multiple attempts.");
};
