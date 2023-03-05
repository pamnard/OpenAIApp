class OpenAIApp {
  constructor(api_key) {
    this.api_key = api_key;
    this.connect = (api_key, options) => {
      var url = `https://api.openai.com/v1/${options.url}`;
      var opt = {
        'method': options.method,
        'contentType': 'application/json',
        'headers': {
          Authorization: 'Bearer ' + api_key,
        },
        muteHttpExceptions: true
      };
      if ((options.method == 'POST') && (!!options.payload)) {
        opt.payload = JSON.stringify(options.payload);
      }
      var response = UrlFetchApp.fetch(url, opt);
      var json = JSON.parse(response);
      if (json.error?.message != undefined) {
        throw new Error(json['error']['message']);
      }
      return json;
    };
  }
  Models() {
    class Models {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      ListModels() {
        var options = {
          method: 'GET',
          url: 'models'
        }
        return this.connect(this.api_key, options);
      }
      RetrieveModel(params = {}) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set RetrieveModel params.model');
          }
          var options = {
            method: 'GET',
            url: `models/${params.model}`,
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set RetrieveModel params')
        }
      }
    }
    return new Models(this.api_key, this.connect);
  }
  Completions() {
    class Completions {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateCompletion(params = {}) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set CreateCompletion params.model');
          }
          var options = {
            method: 'POST',
            url: 'completions',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateCompletion params')
        }
      }
    }
    return new Completions(this.api_key, this.connect);
  }
  Edits() {
    class Edits {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateEdit(params = {}) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set CreateEdit params.model');
          }
          if (params.instruction == undefined) {
            throw new Error('Set CreateEdit params.instruction');
          }
          var options = {
            method: 'POST',
            url: 'completions',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateEdit params')
        }
      }
    }
    return new Edits(this.api_key, this.connect);
  }
  Images() {
    class Images {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateImage(params = {}) {
        if (!!params) {
          if (params.prompt == undefined) {
            throw new Error('Set CreateImage params.prompt');
          }
          var options = {
            method: 'POST',
            url: 'images/generations',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateImage params')
        }
      }
      CreateImageEdit(params = {}) {
        if (!!params) {
          if (params.image == undefined) {
            throw new Error('Set CreateImageEdit params.image');
          }
          if (params.prompt == undefined) {
            throw new Error('Set CreateImageEdit params.prompt');
          }
          var options = {
            method: 'POST',
            url: 'images/edits',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateImageEdit params')
        }
      }
      CreateImageVariation(params = {}) {
        if (!!params) {
          if (params.image == undefined) {
            throw new Error('Set CreateImageVariation params.image');
          }
          var options = {
            method: 'POST',
            url: 'images/variations',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateImageVariation params')
        }
      }
    }
    return new Images(this.api_key, this.connect);
  }
  Chat() {
    class Chat {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateChatCompletion(params = {}) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set CreateChatCompletion params.model');
          }
          if (params.messages == undefined) {
            throw new Error('Set CreateChatCompletion params.messages');
          }
          var options = {
            method: 'POST',
            url: 'chat/completions',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateChatCompletion params')
        }
      }
    }
    return new Chat(this.api_key, this.connect);
  }
  Moderations() {
    class Moderations {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateModeration(params = {}) {
        if (!!params) {
          if (params.input == undefined) {
            throw new Error('Set CreateModeration params.input');
          }
          var options = {
            method: 'POST',
            url: 'moderations',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateModeration params')
        }
      }
    }
    return new Moderations(this.api_key, this.connect);
  }
  Finetunes() {
    class Finetunes {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateFinetune(params = {}) {
        if (!!params) {
          if (params.training_file == undefined) {
            throw new Error('Set CreateFinetune params.training_file');
          }
          var options = {
            method: 'POST',
            url: 'fine-tunes',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateFinetune params')
        }
      }
      ListFinetunes() {
        var options = {
          method: 'GET',
          url: 'fine-tunes'
        }
        return this.connect(this.api_key, options);
      }
      RetrieveFinetune(params = { fine_tune_id: string }) {
        if (!!params) {
          if (params.training_file == undefined) {
            throw new Error('Set CreateFinetune params.training_file');
          }
          var options = {
            method: 'GET',
            url: `fine-tunes/${params.fine_tune_id}`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set RetrieveFinetune params')
        }
      }
      CancelFinetune(params = { fine_tune_id: string }) {
        if (!!params) {
          if (params.training_file == undefined) {
            throw new Error('Set CreateFinetune params.training_file');
          }
          var options = {
            method: 'POST',
            url: `fine-tunes/${params.fine_tune_id}/cancel`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CancelFinetune params')
        }
      }
      ListFinetuneEvents(params = { fine_tune_id: string, payload: { stream: bool } }) {
        if (!!params) {
          if (params.fine_tune_id == undefined) {
            throw new Error('Set ListFinetuneEvents params.fine_tune_id');
          }
          var options = {
            method: 'POST',
            url: `fine-tunes/${params.fine_tune_id}/events`,
            payload: params.payload
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set ListFinetuneEvents params')
        }
      }
      DeleteFinetuneModel(params = { model: string }) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set DeleteFinetuneModel params.model');
          }
          var options = {
            method: 'DELETE',
            url: `models/${params.model}`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set DeleteFinetuneModel params')
        }
      }
    }
    return new Finetunes(this.api_key, this.connect);
  }
  Files() {
    class Files {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      ListFiles() {
        var options = {
          method: 'GET',
          url: 'files'
        }
        return this.connect(this.api_key, options);
      }
      UploadFile(params = {}) {
        if (!!params) {
          if (params.file == undefined) {
            throw new Error('Set UploadFile params.file');
          }
          if (params.purpose == undefined) {
            throw new Error('Set UploadFile params.purpose');
          }
          var options = {
            method: 'POST',
            url: 'files',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set UploadFile params')
        }
      }
      DeleteFile(params = { file_id: string }) {
        if (!!params) {
          if (params.file_id == undefined) {
            throw new Error('Set DeleteFile params.file_id');
          }
          var options = {
            method: 'DELETE',
            url: `files/${params.file_id}`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set DeleteFile params')
        }
      }
      RetrieveFile(params = { file_id: string }) {
        if (!!params) {
          if (params.file_id == undefined) {
            throw new Error('Set RetrieveFile params.file_id');
          }
          var options = {
            method: 'GET',
            url: `files/${params.file_id}`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set RetrieveFile params')
        }
      }
      RetrieveFileContent(params = { file_id: string }) {
        if (!!params) {
          if (params.file_id == undefined) {
            throw new Error('Set RetrieveFileContent params.file_id');
          }
          var options = {
            method: 'GET',
            url: `files/${params.file_id}/content`
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set RetrieveFileContent params')
        }
      }
    }
    return new Files(this.api_key, this.connect);
  }
  Audio() {
    class Audio {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateTranscription(params = {}) {
        if (!!params) {
          if (params.file == undefined) {
            throw new Error('Set CreateTranscription params.file');
          }
          if (params.model == undefined) {
            throw new Error('Set CreateTranscription params.model');
          }
          var options = {
            method: 'POST',
            url: 'audio/transcriptions',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateTranscription params')
        }
      }
      CreateTranslation(params = {}) {
        if (!!params) {
          if (params.file == undefined) {
            throw new Error('Set CreateTranslation params.file');
          }
          if (params.model == undefined) {
            throw new Error('Set CreateTranslation params.model');
          }
          var options = {
            method: 'POST',
            url: 'audio/translations',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateTranslation params')
        }
      }
    }
    return new Audio(this.api_key, this.connect);
  }
  Embeddings() {
    class Embeddings {
      constructor(api_key, connect) {
        this.api_key = api_key;
        this.connect = connect;
      }
      CreateEmbeddings(params = {}) {
        if (!!params) {
          if (params.model == undefined) {
            throw new Error('Set CreateEmbeddings params.model');
          }
          if (params.input == undefined) {
            throw new Error('Set CreateEmbeddings params.input');
          }
          var options = {
            method: 'POST',
            url: 'embeddings',
            payload: params
          }
          return this.connect(this.api_key, options);
        } else {
          throw new Error('Set CreateEmbeddings params')
        }
      }
    }
    return new Embeddings(this.api_key, this.connect);
  }
}
