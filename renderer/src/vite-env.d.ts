/// <reference types="vite/client" />

declare namespace ipc {
  function send(event: string, callback: function): void
}
