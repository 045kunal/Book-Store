import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useLoaderData, useParams } from "react-router-dom";

const EditBooks = () => {
  const bookStatus = ["added", "pending", "confirmed", "shipped", "delivered"];

  const { id } = useParams();
  const initialFormData = useLoaderData();

  const [formData, setFormData] = useState(initialFormData);

  // const handleChangeSelectedValue = (event) => {
  //   // console.log(event.target.value);
  //   setSelectedBookStatus(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    formData.imageLink = form.imageLink.value;
    formData.inventory = form.inventory.value;
    formData.isbn = form.isbn.value;
    formData.language = form.language.value;
    formData.longDescription = form.longDescription.value;
    formData.pages = form.pages.value;
    formData.price = form.price.value;
    formData.publication_date = form.publication_date.value;
    formData.publisher = form.publisher.value;
    formData.shortDescription = form.shortDescription.value;
    formData.title = form.title.value;

    fetch(`http://localhost:3000/edit-book/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        alert("Book updated successfully!!!!");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "authors" || name === "categories"
          ? value.split(",").map((item) => item.trim())
          : value,
    }));
  };

  // useEffect(() => {
  //   setSelectedBookStatus(formData.status);
  // }, [formData.status]);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Edit Book!</h2>
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
              defaultValue={formData.title}
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
              defaultValue={formData.authors}
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
              defaultValue={formData.isbn}
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
              defaultValue={formData.categories}
              onChange={handleChange}
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
              defaultValue={formData.language}
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
              defaultValue={formData.pages}
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
              defaultValue={formData.publication_date}
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
              defaultValue={formData.publisher}
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
              defaultValue={formData.imageLink}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/3">
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
              defaultValue={formData.price}
              step="any"
            />
          </div>

          <div className="lg:w-1/3">
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
              defaultValue={formData.inventory}
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
            defaultValue={formData.longDescription}
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
            defaultValue={formData.shortDescription}
          />
        </div>

        {/* Submit btn */}
        <Button type="submit" className="mt-5">
          Update book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
