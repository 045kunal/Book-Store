import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

const UploadBook = () => {
  // const bookCategories = [
  //   "Fiction",
  //   "Non-fiction",
  //   "Mystery",
  //   "Programming",
  //   "Science fiction",
  //   "Fantasy",
  //   "Horror",
  //   "Biography",
  //   "Autobiography",
  //   "History",
  //   "Self-help",
  //   "Business",
  //   "Memoir",
  //   "Poetry",
  //   "Children's books",
  //   "Travel",
  //   "Religion and spirituality",
  //   "Science",
  //   "Art and design",
  // ];

  // const [selectedBookCategory, setSelectedBookCategory] = useState(
  //   bookCategories[0]
  // );

  // const handleChangeSelectedValue = (event) => {
  //   console.log(event.target.value);
  //   setSelectedBookCategory(event.target.value);
  // };

  const bookStatus = ["added", "pending", "confirmed", "shipped", "delivered"];

  const [selectedBookStatus, setSelectedBookStatus] = useState(bookStatus[0]);

  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value);
    setSelectedBookStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const isbn = form.isbn.value;
    const publication_date = form.publication_date.value;
    const price = form.price.value;
    const categories = form.categories.value;
    const publisher = form.publisher.value;
    const language = form.language.value;
    const pages = form.pages.value;
    const authors = form.authors.value;
    const inventory = form.inventory.value;
    const status = form.status.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const imageLink = form.imageLink.value;

    const bookObj = {
      title,
      isbn,
      publication_date,
      price,
      categories,
      publisher,
      language,
      pages,
      authors,
      inventory,
      status,
      shortDescription,
      longDescription,
      imageLink,
    };
    // console.log(dataObj)
    fetch("http://localhost:3000/upload-book/", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        alert("Book updated successfully!!!!");
        form.reset();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is: ", name);
    bookObj[name] =
      name === "authors"
        ? value.split(",").map((author) => author.trim())
        : value;
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload A Book!</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Book Name"
              required
              type="text"
              name="title"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authors" value="Authors Name" />
            </div>
            <TextInput
              id="authors"
              placeholder="Author Name"
              required
              type="text"
              name="authors"
              className="w-full"
              onChange={handleChange}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="isbn" value="ISBN" />
            </div>
            <TextInput
              id="isbn"
              placeholder="ISBN Number"
              required
              type="text"
              name="isbn"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="categories" value="Categories" />
            </div>
            <TextInput
              id="categories"
              placeholder="Book Category"
              required
              type="text"
              name="categories"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="language" value="Book Language" />
            </div>
            <TextInput
              id="language"
              placeholder="Book Language"
              required
              type="text"
              name="language"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="pages" value="Number Of Pages" />
            </div>
            <TextInput
              id="pages"
              placeholder="Number Of Pages"
              required
              type="Number"
              name="pages"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="publication_date" value="Publication Date" />
            </div>
            <TextInput
              id="publication_date"
              placeholder="Publication Date"
              required
              type="text"
              name="publication_date"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="publisher" value="Book Publisher" />
            </div>
            <TextInput
              id="publisher"
              placeholder="Book Publisher"
              required
              type="text"
              name="publisher"
              className="w-full"
            />
          </div>
          {/* book category */}
          {/* <div className='lg:w-1/2'>
                <div className="mb-2 block">
                  <Label
                    htmlFor="inputState"
                    value="Book Category"
                  />
                </div>
                <Select
                  id="inputState"
                  name="categoryName"
                  className="w-full rounded"
                  value={selectedBookCategory}
                  onChange={handleChangeSelectedValue}
                >
                  {bookCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div> */}

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="status" value="Book Status" />
            </div>
            <Select
              id="status"
              value={selectedBookStatus}
              onChange={handleChangeSelectedValue}
              type="text"
              name="status"
              className="w-full rounded"
            >
              {bookStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price (In Dollars)" />
            </div>
            <TextInput
              id="price"
              placeholder="Book Price"
              required
              type="Number"
              name="price"
              className="w-full"
              step="any"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inventory" value="Book Quantity" />
            </div>
            <TextInput
              id="inventory"
              placeholder="Book Quantity"
              required
              type="Number"
              name="inventory"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageLink" value="Book Image Link" />
            </div>
            <TextInput
              id="imageLink"
              placeholder="Paste Book Image Link"
              required
              type="text"
              name="imageLink"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="longDescription" value="Book Long Description" />
          </div>
          <Textarea
            id="longDescription"
            placeholder="Book Long Description"
            required
            type="text"
            name="longDescription"
            className="w-1/2"
            // rows={10}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="shortDescription" value="Book short Description" />
          </div>
          <Textarea
            id="shortDescription"
            placeholder="Book Short Description"
            required
            type="text"
            name="shortDescription"
            className="w-1/2"
            // rows={10}
          />
        </div>

        {/* Submit btn */}
        <Button type="submit" className="mt-5">
          Upload book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
