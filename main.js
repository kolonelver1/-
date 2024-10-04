'use strict';//エラーあれば表示、必ず先頭

{
  let todos;//変数todosを定義

  //↓デフォルト設定
  if (localStorage.getItem('todos') === null) {
    todos = [];//key[todos]が空なら何も返さない
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));//空でないならそれを返す
  }

  const saveTodos = () => {//定数saveTodosを定義
    localStorage.setItem('todos', JSON.stringify(todos));//key,todosからオブジェクトを取得
  };
  
  const renderTodo = (todo) => {//定数rederTodoを定義
    const input = document.createElement('input');//定数inputで下の要素を作る
    input.type = 'checkbox';//checkboxタイプ
    input.checked = todo.isCompleted;//チェックされえていない状態
    input.addEventListener('change', () => {//イベントを起こす
      todos.forEach((item) => {//todosの反復処理、引き数にitem
        if (item.id === todo.id) {//もし、item.idとtodo.idが同じなら
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();//saveTodosを実行
    });
    const span = document.createElement('span');//定数spanで下の要素を作る
    span.textContent = todo.title;
    const label = document.createElement('label');//定数labelで下の要素を作る
    label.appendChild(input);//label要素の最後にinputを追加
    label.appendChild(span);//lebel要素の最後にspanを追加
    const button = document.createElement('button');//定数buttonで下の要素を作る
    button.textContent = 'x';//テキスト型でXを代入
    button.addEventListener('click', () => {
      if (!confirm('Sure?')) {
          return;
      }
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();//定数の実行
    });
    const li = document.createElement('li');//定数liで下の要素を作る
    li.appendChild(label);//li要素の最後にlabelを追加
    li.appendChild(button);//li要素の最後にbuttonを追加
    document.querySelector('#todos').appendChild(li);//要素#todosを取得し、最後にliを追加
  };

  const renderTodos = () => {
    todos.forEach((todo) => {//todosの反復処理、引き数todo
      renderTodo(todo);//定数の実行
    });
  };

  //↓ここから追加
  document.querySelector('#add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#add-form input');
    const todo = {
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);//todosの最後にtodoを追加
    console.table(todos);//コンソールにテーブル表示を追加
    saveTodos();//定数の実行
    input.value = '';//定数inputの中身を空にする
    input.focus();//定数の実行
  });


  //↓ここからチャック項目のすべてを削除
  document.querySelector('#purge').addEventListener('click', () => {//要素'#purge'を取得し、クリックしたら→
    if (!confirm('Sure?')) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;//チェックが入っているもの
    });
    saveTodos();//定数の実行
    document.querySelectorAll('#todos li').forEach((li) => {//todos liの反復処理
      li.remove();//定数の実行
    });
    renderTodos();//定数の実行
  });

  renderTodos();//定数の実行
}