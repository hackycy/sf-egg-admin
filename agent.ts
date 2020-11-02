import { Agent } from 'egg';

/**
 * https://eggjs.org/zh-cn/core/cluster-and-ipc.html
 */
export default (agent: Agent) => {
  agent.messenger.on('egg-ready', () => {
    agent.messenger.sendRandom('init-task', { name: 'init-task' });
  });
};
