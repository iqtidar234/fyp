import { KeyConfiguration, ModelType } from '@/types';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { TaskType } from '@google/generative-ai';

export const getEmbeddings = async (keyConfiguration: KeyConfiguration) => {
  if (keyConfiguration.apiType === ModelType.AZURE_OPENAI) {
    return new OpenAIEmbeddings({
      azureOpenAIApiKey: keyConfiguration.azureApiKey,
      azureOpenAIApiInstanceName: keyConfiguration.azureInstanceName,
      azureOpenAIApiDeploymentName:
        keyConfiguration.azureEmbeddingDeploymentName,
      azureOpenAIApiVersion: keyConfiguration.azureApiVersion,
    });
  } else {
    return new OpenAIEmbeddings({
      openAIApiKey: keyConfiguration.apiKey,
    });
    // return new GoogleGenerativeAIEmbeddings({
    //   model: 'text-embedding-004', // 768 dimensions
    //   apiKey: 'AIzaSyDp9yqwrVftYV5ph2dyOuX8zCGKiSC7sf8',
    // });
  }
};
