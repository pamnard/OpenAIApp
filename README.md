# OpenAIApp
OpenAI API wrapper for Google Apps Scripts

You can use **OpenAIApp.gs** as a part of your project.

All parameters names are the same as in the official documentation - [https://platform.openai.com/docs/api-reference/introduction](https://platform.openai.com/docs/api-reference/introduction).  Wrap the method parameters in a js-object and pass it to the method as only one parameter.

## Examples

### ChatGPT

```javascript
var api_key = '**************************************************';
var openai = new OpenAIApp(api_key);
var result = openai.Chat().CreateChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
        role: 'user',
        content: 'Tell me a joke'
    }]
});
Logger.log(result.choices[0].message.content.replace(/^\n\n/, ''));
```
![2023-03-05_15-07](https://user-images.githubusercontent.com/11365082/222959596-39c2b593-5de4-41e1-ab36-956bb31cb02f.png)

### Create image

```javascript
  var api_key = '**************************************************';
  var openai = new OpenAIApp(api_key);
  var result = openai.Images().CreateImage({
    prompt: 'Fat black cat'
  })
  Logger.log(result.data[0].url);
```

![2023-03-05_15-08](https://user-images.githubusercontent.com/11365082/222959857-3089b92e-fe9a-47b1-be8f-4fcde7192887.png)
