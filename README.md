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

To save the context, you can use caching in the script:

```javascript
function cache_context(question) {
    var cache = CacheService.getScriptCache();
    var cache_str = cache.get('cache');
    var messages = [];
    if (cache_str == null) {
        messages = [{
            "role": "user",
            "content": question
        }];
    } else {
        messages = JSON.parse(cache_str);
        messages[messages.length] = {
            "role": "user",
            "content": question
        };
    }
    
    var answer = openai.Chat().CreateChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages
    }).choices[0].message.content.replace(/^\n\n/, '');
    
    messages[messages.length] = {
        "role": "assistant",
        "content": answer
    };
    
    while (JSON.stringify(messages).length > 100000) {
        var todelete = messages.shift();
    }
    
    cache.put('cache', JSON.stringify(messages), 300);
    return response;
}
```

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
