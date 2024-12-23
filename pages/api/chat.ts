import { ChatBody } from '@/types';
// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';
import { getKeyConfiguration } from '@/utils/app/configuration';
import { NextApiRequest, NextApiResponse } from 'next';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { getChatModel } from '@/utils/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import {
  NewTokenIndices,
  HandleLLMNewTokenCallbackFields,
} from '@langchain/core/dist/callbacks/base';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('beginning handler in chat api');

  const { messages, prompt } = req.body as ChatBody;
  const keyConfiguration = getKeyConfiguration(req);

  let input: string;
  if (messages.length === 1) {
    input = messages[0].content;
  } else {
    input = messages[messages.length - 1].content;
  }

  const historyMessages: BaseMessage[] = messages
    ?.slice(0, messages.length - 1)
    .map((message) => {
      if (message.role === 'user') {
        return new HumanMessage(message.content);
      } else if (message.role === 'assistant') {
        return new AIMessage(message.content);
      }
      throw new TypeError('Invalid message role');
    });

  try {
    const llm = await getChatModel(keyConfiguration, res);

    // const llm = new ChatOllama({
    //     temperature: 0.9,
    //     baseUrl: 'http://localhost:11434', // Default value
    //     model: 'mistral:7b-instruct-v0.3-q4_1', // Default value
    //     callbacks: [{
    //       handleLLMNewToken: async (token: string, idx: NewTokenIndices, runId: string, parentRunId?: string, tags?: string[], fields?: HandleLLMNewTokenCallbackFields) => {
    //           res.write(token);
    //       },
    //       handleLLMEnd: async () => {
    //           res.end();
    //       },
    //   }
    //   ],
    // });

    const promptTemplate = ChatPromptTemplate.fromMessages([
      HumanMessagePromptTemplate.fromTemplate('{input}'),
    ]);

    const memory = new BufferMemory({
      returnMessages: true,
      chatHistory: new ChatMessageHistory(historyMessages),
    });
    const chain = new ConversationChain({
      llm: llm,
      memory: memory,
      prompt: promptTemplate,
    });

    await chain.call({ input });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: (err as Error).toString() });
  }
};

export default handler;
