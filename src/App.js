import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FromSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you £{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} £{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text" />

      <label type="text">🌆 Img url</label>
      <input type="text" />

      <Button>Add friend</Button>
    </form>
  );
}

function FromSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split bill with X</h2>
      <label>💸 Bill value</label>
      <input type="text" />
      <label>👦Your expenses</label>
      <input type="text" />
      <label> 🧑‍🤝‍🧑 Xs expenses</label>
      <input type="text" disabled />
      <label>🤑 whos is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Add friend</Button>
    </form>
  );
}
