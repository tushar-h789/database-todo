import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

function App() {
  const db = getDatabase();

  let [text, setText] = useState("");
  let [text2, setText2] = useState("");
  let [todo, setTodo] = useState([]);

  let handelText = (e) => {
    setText(e.target.value);
  };

  let handelSubmit = () => {
    set(push(ref(db, "amar kaj")), {
      kaj: text,
    }).then(() => {
      console.log("kaj hoiche");
    });
  };

  useEffect(() => {
    const todoRef = ref(db, "amar kaj");
    onValue(todoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodo(arr);
      console.log(arr);
    });
  }, []);

  let handelDelete = (id) => {
    remove(ref(db, "amar kaj/" + id)).then(() => {
      console.log("kaj hoiche");
    });
  };

  let handelEdit = (id) => {
    update(ref(db, "amar kaj/" + id), {
      kaj: text2,
    }).then(() => {
      console.log("update hoiche");
    });
  };

  return (
    <>
      <input onChange={handelText} />
      <button onClick={handelSubmit}>Add</button>
      <input onChange={(e) => setText2(e.target.value)} />

      <ul>
        {todo.map((item, index) => (
          <li key={index}>
            {item.kaj} {item.id}
            <button onClick={() => handelEdit}>Edit</button>
            <button onClick={() => handelDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
