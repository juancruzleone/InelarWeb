export function filterMensajes(messages, searchTerm) {
  return messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    message.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
