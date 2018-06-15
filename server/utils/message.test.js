const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate currect message object', () => {
    const from = 'vanske';
    const text = 'some text'
    const message = generateMessage(from, text)

    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  })
})

describe('generateLocationMessage', () => {
  it('should generate current location object', () => {
    const from = "van"
    const latitude = 123;
    const longitude = 143;
    const url = `https://google.com/maps?q=${latitude},${longitude}`

    const messageLocation = generateLocationMessage(from, latitude, longitude);
    expect(messageLocation.url).toBe(url);
    expect(messageLocation).toInclude({from, url})
  })
})

