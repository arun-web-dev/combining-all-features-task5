import { useState, useEffect } from "react";
import Nabvar from "./Nabvar";
import "tachyons";
import { App as RecipeFinderApp } from "./RecipeFinder/Components/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./RecipeNotes/Components/Header";
import { RecipeList } from "./RecipeNotes/Components/RecipeList";
import { ContactList } from "./ContactsApp/Components/ContactList";
import { v4 as uuidV4 } from "uuid";
import EditRecipe from "./RecipeNotes/Components/EditRecipe";
import { Modal } from "./RecipeNotes/Components/Modal";
import { RecipeDetail } from "./RecipeNotes/Components/RecipeDetail";
import EditContact from "./ContactsApp/Components/EditContact";
import { ContactDetail } from "./ContactsApp/Components/ContactDetail";
import { ContactModal } from "./ContactsApp/Components/ContactModal";
import { ContactHeader } from "./ContactsApp/Components/ContactHeader";

function App() {
  // states for RecipeList App
  const LOCAL_STORAGE_KEY = "recipes";
  const LOCAL_STORAGE_KEY_CONTACT = "contacts";
  const [recipes, setRecipes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const addRecipe = (recipe) => {
    const { title, publisher } = recipe;
    setRecipes([
      ...recipes,
      {
        id: uuidV4(),
        title,
        publisher,
        image: `https://picsum.photos/200/300?random=${recipe.id}`,
      },
    ]);
  };
  const addContact = (contact) => {
    const { name, email } = contact;
    setContacts([
      ...contacts,
      {
        id: uuidV4(),
        name,
        email,
        image: `https://picsum.photos/200/300?random=${contact.id}`,
      },
    ]);
  };

  const modifyRecipe = (editRecipe) => {
    console.log(editRecipe);
    setRecipes(
      recipes.map((recipe) => {
        return recipe.id === editRecipe.id ? editRecipe : recipe;
      })
    );
  };
  const modifyContact = (editContact) => {
    setContacts(
      contacts.map((contact) => {
        return contact.id === editContact.id ? editContact : contact;
      })
    );
  };
  const removeRecipe = (id) => {
    const newRecipe = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipe);
  };
  const removeContact = (id) => {
    const newContact = contacts.filter((contact) => contact.id !== id);
    setContacts(newContact);
  };

  useEffect(() => {
    const loadedRecipe = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (loadedRecipe) setRecipes(loadedRecipe);
  }, []);

  useEffect(() => {
    const loadedContact = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CONTACT)
    );
    if (loadedContact) setContacts(loadedContact);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONTACT, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Router>
        <Nabvar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeFinderApp />
              </>
            }
          />
          <Route
            path="/Home"
            element={
              <>
                <Nabvar /> <RecipeFinderApp />
              </>
            }
          />
          <Route
            path="/RecipesNoteHome"
            element={
              <>
                <Header />
                <RecipeList recipes={recipes} />
              </>
            }
          />
          <Route
            path="/ContactAppHome"
            element={
              <>
                <ContactHeader />
                <ContactList contacts={contacts} />
              </>
            }
          />
          <Route
            path="/editRecipe"
            element={
              <EditRecipe modifyRecipe={modifyRecipe} addRecipe={addRecipe} />
            }
          />
          <Route
            path="/editContact"
            element={
              <EditContact
                modifyContact={modifyContact}
                addContact={addContact}
              />
            }
          />
          <Route
            path="/modal"
            element={<Modal removeRecipe={removeRecipe} />}
          />
          <Route
            path="/ContactModal"
            element={
              <ContactModal
                removeContact={removeContact}
                removeRecipe={removeRecipe}
              />
            }
          />

          <Route path="/recipeDetail" element={<RecipeDetail />} />
          <Route path="/contactDetail" element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
