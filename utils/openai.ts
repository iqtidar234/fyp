import { KeyConfiguration, ModelType } from '@/types';
import { ChatOpenAI } from '@langchain/openai';
import {
  NewTokenIndices,
  HandleLLMNewTokenCallbackFields,
} from '@langchain/core/dist/callbacks/base';
import { NextApiResponse } from 'next';
import { ChatOllama } from '@langchain/community/chat_models/ollama';

process.env.LANGCHAIN_HANDLER = 'langchain';

export const getModel = async (
  keyConfiguration: KeyConfiguration,
  res: NextApiResponse,
) => {
  if (keyConfiguration.apiType === ModelType.AZURE_OPENAI) {
    return new ChatOpenAI({
      temperature: 0.9,
      streaming: true,
      azureOpenAIApiKey: keyConfiguration.azureApiKey,
      azureOpenAIApiInstanceName: keyConfiguration.azureInstanceName,
      azureOpenAIApiDeploymentName: keyConfiguration.azureDeploymentName,
      azureOpenAIApiVersion: keyConfiguration.azureApiVersion,
      callbacks: getCallbackManager(res),
    });
  } else {
    return new ChatOpenAI({
      temperature: 0.9,
      modelName: keyConfiguration.apiModel,
      streaming: true,
      openAIApiKey: keyConfiguration.apiKey,
      callbacks: getCallbackManager(res),
    });
  }
};

export const getChatModel = async (
  keyConfiguration: KeyConfiguration,
  res: NextApiResponse,
) => {
  if (keyConfiguration.apiType === ModelType.AZURE_OPENAI) {
    return new ChatOpenAI({
      temperature: 0.9,
      streaming: true,
      azureOpenAIApiKey: keyConfiguration.azureApiKey,
      azureOpenAIApiInstanceName: keyConfiguration.azureInstanceName,
      azureOpenAIApiDeploymentName: keyConfiguration.azureDeploymentName,
      azureOpenAIApiVersion: keyConfiguration.azureApiVersion,
      callbacks: getCallbackManager(res),
    });

    // const model = new ChatOllama({
    //     temperature: 0.9,
    //     baseUrl: 'http://localhost:11434', // Default value
    //     model: 'mistral:7b-instruct-v0.3-q4_1', // Default value
    //     callbacks: getCallbackManager(res),
    // });
  } else {
    return new ChatOpenAI({
      temperature: 0.9,
      modelName: keyConfiguration.apiModel,
      streaming: true,
      openAIApiKey: keyConfiguration.apiKey,
      callbacks: getCallbackManager(res),
    });
  }
};

export const getCallbackManager = (res: NextApiResponse) => {
  return [
    {
      handleLLMNewToken: async (
        token: string,
        idx: NewTokenIndices,
        runId: string,
        parentRunId?: string,
        tags?: string[],
        fields?: HandleLLMNewTokenCallbackFields,
      ) => {
        res.write(token);
      },
      handleLLMEnd: async () => {
        res.end();
      },
    },
  ];
};
