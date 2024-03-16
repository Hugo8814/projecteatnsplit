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
    name: "liam  ",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: -20,
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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }
  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }
  function handleSelectFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FromSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    console.log(name, image);
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label type="text">🌆 Img url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add friend</Button>
    </form>
  );
}

function FromSplitBill({ selectedFriend, onSplitBill }) {
  const [Bill, setBill] = useState("");
  const [paidByUesr, setpaidByUesr] = useState("");
  const paidByFriend = Bill ? Bill - paidByUesr : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!Bill || !paidByUesr) return;

    onSplitBill(whoIsPaying === "user" ? paidByUesr : paidByFriend);
  }

  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💸 Bill value</label>
      <input
        type="text"
        value={Bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>👦Your expenses</label>
      <input
        type="text"
        value={paidByUesr}
        onChange={(e) =>
          setpaidByUesr(
            Number(e.target.value) > Bill ? paidByUesr : Number(e.target.value)
          )
        }
      />
      <label> 🧑‍🤝‍🧑 {selectedFriend.name}'s expenses</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑 whos is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  );
}
