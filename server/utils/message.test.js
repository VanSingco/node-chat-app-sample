const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate currect message object', () => {
    const from = 'vanske';
    const text = 'some text'
    const message = generateMessage(from, text)

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  })
})
