const deeds = [
  {
    desc: "Compliment someone sincerely on something specific you genuinely appreciate.",
    snip: "A few kind words can stay with someone all day."
  },
  {
    desc: "Hold the door open for someone without expecting acknowledgment.",
    snip: "Small gestures make shared spaces feel warmer."
  },
  {
    desc: "Send a thoughtful message to a friend or family member just to check in.",
    snip: "Connection grows through simple moments."
  },
  {
    desc: "Pick up a piece of litter during your walk.",
    snip: "Leave every place a little better than you found it."
  },
  {
    desc: "Leave a positive review for a local business you genuinely enjoyed.",
    snip: "Your words can help good people thrive."
  },
  {
    desc: "Thank someone whose work often goes unnoticed.",
    snip: "Recognition is a gift anyone can give."
  },
  {
    desc: "Let someone merge into traffic with a smile.",
    snip: "Patience has a ripple effect."
  },
  {
    desc: "Offer to help a coworker with a small task.",
    snip: "Teamwork starts with tiny acts of support."
  },
  {
    desc: "Donate clothes or household items you no longer use.",
    snip: "What you no longer need could mean a lot to someone else."
  },
  {
    desc: "Write a heartfelt thank-you note to someone who has impacted your life.",
    snip: "Gratitude becomes more powerful when shared."
  },
  {
    desc: "Return a shopping cart instead of leaving it in the parking lot.",
    snip: "Integrity shows in the little things."
  },
  {
    desc: "Offer your seat to someone who may need it more.",
    snip: "Kindness often begins with awareness."
  },
  {
    desc: "Share useful knowledge or teach someone a skill you know well.",
    snip: "Knowledge grows when it's shared."
  },
  {
    desc: "Give someone your full attention during a conversation.",
    snip: "Being present is one of the greatest gifts."
  },
  {
    desc: "Leave an encouraging note for a coworker, roommate, or loved one.",
    snip: "A surprise smile can brighten an ordinary day."
  },
  {
    desc: "Support a creator by sharing their work if you genuinely enjoy it.",
    snip: "Helping others grow costs very little."
  },
  {
    desc: "Help someone carry a heavy item if they welcome the assistance.",
    snip: "Strength is best when shared."
  },
  {
    desc: "Be especially patient with someone who seems stressed.",
    snip: "Compassion often matters most when it's hardest."
  },
  {
    desc: "Call an older relative or family friend to catch up.",
    snip: "Your time is one of the most meaningful gifts."
  },
  {
    desc: "Leave a public place cleaner than you found it.",
    snip: "Care for places reflects care for people."
  },
  {
    desc: "Smile and greet people you encounter during the day.",
    snip: "Kindness often starts with eye contact and a smile."
  },
  {
    desc: "Offer to take a photo for a group that's trying to fit everyone in.",
    snip: "Help create a memory they'll all be part of."
  },
  {
    desc: "Donate to a cause you care about, even if it's a small amount.",
    snip: "Every contribution adds up."
  },
  {
    desc: "Give someone credit for their idea or contribution.",
    snip: "Generosity includes sharing recognition."
  },
  {
    desc: "Leave an extra tip when you receive excellent service and you're able to.",
    snip: "Generosity can turn a good day into a great one."
  },
  {
    desc: "Offer words of encouragement to someone working toward a goal.",
    snip: "Belief from others fuels confidence."
  },
  {
    desc: "Forgive a minor mistake instead of dwelling on it.",
    snip: "Grace makes life lighter for everyone."
  },
  {
    desc: "Share an umbrella or lend one if someone is caught in the rain.",
    snip: "Shelter can be shared in more ways than one."
  },
  {
    desc: "Be mindful not to interrupt someone while they're speaking.",
    snip: "Listening is an act of respect."
  },
  {
    desc: "Invite someone who seems left out to join a conversation or activity.",
    snip: "Inclusion begins with a simple invitation."
  },
  {
    desc: "Refill the office coffee pot or shared water pitcher after using the last of it.",
    snip: "Leave something ready for the next person."
  },
  {
    desc: "Encourage someone by acknowledging their progress, not just their results.",
    snip: "Growth deserves celebration too."
  },
  {
    desc: "Help someone find their way if they look lost.",
    snip: "A little guidance goes a long way."
  },
  {
    desc: "Return something you borrowed in better condition than you received it.",
    snip: "Respect is shown through actions."
  },
  {
    desc: "Offer sincere congratulations when someone succeeds.",
    snip: "Celebrate others generously."
  },
  {
    desc: "Spend a few minutes volunteering for a community or online project.",
    snip: "Many hands make meaningful change."
  },
  {
    desc: "Leave a kind comment on someone's creative work.",
    snip: "Encouragement fuels creativity."
  },
  {
    desc: "Choose understanding over winning during a disagreement.",
    snip: "Peace is often more valuable than being right."
  },
  {
    desc: "Water a neighbor's plants if they've asked and are away.",
    snip: "Reliability is a quiet form of kindness."
  },
  {
    desc: "Express appreciation to someone before the day ends.",
    snip: "Don't let gratitude wait."
  }
]

function deedPrompts() {
  const index = Math.floor(Math.random() * deeds.length);
  return deeds[index];
}

module.exports = { deedPrompts };