const messages = {
  sendMyContact: {
    text: 'Send my contact',
    reply: {
      success: (name: string) => `Hi ${name}! You're in.`,
      error: (phoneNumber: string) => `Phone ${phoneNumber} is not allowed.`,
    },
  },
  doNotSendMyContact: {
    text: "I don't want to send my contact",
    reply: "Sorry, you can't continue work with this bot.",
  },
};

export default messages;
