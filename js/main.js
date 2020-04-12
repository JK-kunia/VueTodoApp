(function() {
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: { //指定したデータの監視
      todos: { //todosに変更があった時の処理
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos)); //localStorageにtodosの値をJSON形式で保存
        },
        deep: true
      }
    },
    mounted: function() { //マウントされるタイミングでデータを読み込む
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];//this.todosにJSONをparseしつつlocalStorageからtodosのキーでデータをgetItem()する
      //JSONのparseがうまく行かなかったら空の配列にする
    },
    methods: {
      addItem: function() { //todosを追加していく
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);//data内のデータにはthisでアクセス newItemに追加された内容がtodosの末尾に追加されてli要素に反映される
        this.newItem = '';            //input内に文字を残さない
      },
      deleteItem: function(index) {
        if (confirm('削除してよろしいですか？')) {
          this.todos.splice(index, 1);  //index番目から1個削除
      }
    },
    purge: function() {
      if (!confirm('本当に消しますか?')) { //キャンセルされたときリターン
        return;
      }
      this.todos = this.remaining; //remainingに終わったTodoの配列そのものを返す
    }
  },
    computed: { //データから動的にプロパティを計算してくれる算出プロパティ
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });
})();
