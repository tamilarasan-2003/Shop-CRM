
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
function AddItem() {
 const [name, setName] = useState("");
const [category, setCategory] = useState("Tea");
const [price, setPrice] = useState("");
const [available, setAvailable] = useState("Available");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
  

const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setImage(reader.result);
  };

  reader.readAsDataURL(file);
};
const saveItem = () => {
  if (!name || !price || !image) {
    alert("Please fill all fields");
    return;
  }

  const item = {
    id: Date.now(),
    name,
    category,
    price,
    qty: 100,
    available,
    description,
    image,
  };

  const items = JSON.parse(localStorage.getItem("items")) || [];

  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));

  alert("Item Saved Successfully");

  // Clear Form
  setName("");
  setCategory("Tea");
  setPrice("");
  setAvailable("Available");
  setDescription("");
  setImage("");
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Add New Item
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="space-y-5">

            {/* Item Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Item Name
              </label>
             <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Milk Tea"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Category
                </label>

              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded-lg px-4 py-3"
>
  <option>Tea</option>
  <option>Coffee</option>
  <option>Juice</option>
  <option>Snacks</option>
</select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Price
                </label>

               <input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="₹40"
  className="w-full border border-gray-300 rounded-lg px-4 py-3"
/>
              </div>

            </div>

            {/* Available */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Availability
              </label>

              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>

              <textarea
  rows="5"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter product description..."
  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
/>
            </div>

          </div>

          {/* Right Side */}
          <div>

            <label className="block mb-3 font-medium text-gray-700">
              Product Image
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center overflow-hidden bg-gray-50">

              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">

                  <UploadCloud className="mx-auto w-16 h-16 text-gray-400" />

                  <p className="mt-4 text-lg text-gray-500">
                    Upload Product Image
                  </p>

                  <p className="text-sm text-gray-400">
                    JPG, PNG, JPEG
                  </p>

                </div>
              )}

            </div>

            <label className="inline-block mt-5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">

              Choose Image

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />

            </label>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">

          <button className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white">
            Cancel
          </button>

         <button
  onClick={saveItem}
  className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
>
  Save Item
</button>

        </div>

      </div>
    </div>
  );
}

export default AddItem;