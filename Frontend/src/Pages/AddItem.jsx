import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

function AddItem() {

    // ==============================
    // Form States
    // ==============================

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Tea");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState("Available");
    const [description, setDescription] = useState("");

    // Actual image file
    const [imageFile, setImageFile] = useState(null);

    // Image preview
    const [imagePreview, setImagePreview] = useState("");

    // Products
    const [products, setProducts] = useState([]);

    // ==============================
    // Fetch Products
    // ==============================

    const fetchProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/products"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch products"
                );
            }

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );
        }
    };


    // ==============================
    // Load Products
    // ==============================

    useEffect(() => {

        fetchProducts();

    }, []);


    // ==============================
    // Image Select
    // ==============================

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;


        // Validate image
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {

            alert(
                "Please select JPG, PNG or WEBP image"
            );

            return;
        }


        // Maximum 5 MB
        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Image size must be less than 5MB"
            );

            return;
        }


        // Store actual file
        setImageFile(file);


        // Create preview
        const reader = new FileReader();

        reader.onload = () => {

            setImagePreview(
                reader.result
            );
        };

        reader.readAsDataURL(file);
    };


    // ==============================
    // Save Product
    // ==============================

    const saveItem = async () => {

        if (!name || !price) {

            alert(
                "Please fill all required fields"
            );

            return;
        }


        try {

            // FormData
            const formData = new FormData();


            // Product details
            formData.append(
                "name",
                name
            );

            formData.append(
                "category",
                category
            );

            formData.append(
                "price",
                Number(price)
            );

            formData.append(
                "stock",
                100
            );

            formData.append(
                "available",
                available === "Available"
                    ? 1
                    : 0
            );


            // Description
            formData.append(
                "description",
                description
            );


            // Actual image
            if (imageFile) {

                formData.append(
                    "image",
                    imageFile
                );
            }


            // API request
            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",
                    body: formData
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create product"
                );
            }


            alert(
                "Item Saved Successfully"
            );


            // ==========================
            // Reset Form
            // ==========================

            setName("");

            setCategory("Tea");

            setPrice("");

            setAvailable(
                "Available"
            );

            setDescription("");

            setImageFile(null);

            setImagePreview("");


            // Refresh product list
            fetchProducts();


        } catch (error) {

            console.error(
                "Save error:",
                error
            );

            alert(
                error.message ||
                "Failed to save item"
            );
        }
    };


    // ==============================
    // Render
    // ==============================

    return (

        <div className="min-h-screen bg-[#f8f9fa] px-5 py-5">

            {/* ================= ADD ITEM ================= */}

            <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg p-6">

                {/* Heading */}

                <div className="mb-6">

                    <h2 className="text-[20px] font-semibold text-black">
                        Add New Item
                    </h2>

                    <p className="text-[11px] text-gray-500 mt-1">
                        Add a new product to your shop
                    </p>

                </div>


                {/* ================= FORM ================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                    {/* ================= LEFT ================= */}

                    <div className="space-y-4">


                        {/* ITEM NAME */}

                        <div>

                            <label className="block mb-1.5 text-[12px] font-medium text-black">
                                Item Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Milk Tea"
                                className="
                                    w-full
                                    h-[40px]
                                    border border-gray-300
                                    rounded-md
                                    px-3
                                    text-[12px]
                                    text-gray-700
                                    outline-none
                                    focus:border-gray-500
                                "
                            />

                        </div>


                        {/* CATEGORY + PRICE */}

                        <div className="grid grid-cols-2 gap-3">


                            {/* CATEGORY */}

                            <div>

                                <label className="block mb-1.5 text-[12px] font-medium text-black">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        h-[40px]
                                        border border-gray-300
                                        rounded-md
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                        bg-white
                                    "
                                >

                                    <option value="Tea">
                                        Tea
                                    </option>

                                    <option value="Coffee">
                                        Coffee
                                    </option>

                                    <option value="Juice">
                                        Juice
                                    </option>

                                    <option value="Snacks">
                                        Snacks
                                    </option>

                                    <option value="Cake">
                                        Cake
                                    </option>

                                </select>

                            </div>


                            {/* PRICE */}

                            <div>

                                <label className="block mb-1.5 text-[12px] font-medium text-black">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                    placeholder="₹40"
                                    min="0"
                                    className="
                                        w-full
                                        h-[40px]
                                        border border-gray-300
                                        rounded-md
                                        px-3
                                        text-[12px]
                                        text-gray-700
                                        outline-none
                                    "
                                />

                            </div>

                        </div>


                        {/* AVAILABILITY */}

                        <div>

                            <label className="block mb-1.5 text-[12px] font-medium text-black">
                                Availability
                            </label>

                            <select
                                value={available}
                                onChange={(e) =>
                                    setAvailable(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    h-[40px]
                                    border border-gray-300
                                    rounded-md
                                    px-3
                                    text-[12px]
                                    text-gray-700
                                    outline-none
                                    bg-white
                                "
                            >

                                <option value="Available">
                                    Available
                                </option>

                                <option value="Not Available">
                                    Not Available
                                </option>

                            </select>

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-1.5 text-[12px] font-medium text-black">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter product description..."
                                className="
                                    w-full
                                    border border-gray-300
                                    rounded-md
                                    px-3
                                    py-2.5
                                    text-[12px]
                                    text-gray-700
                                    outline-none
                                    resize-none
                                    focus:border-gray-500
                                "
                            />

                        </div>

                    </div>


                    {/* ================= RIGHT IMAGE ================= */}

                    <div>

                        <label className="block mb-1.5 text-[12px] font-medium text-black">
                            Product Image
                        </label>


                        {/* IMAGE BOX */}

                        <div
                            className="
                                border
                                border-dashed
                                border-gray-300
                                rounded-lg
                                h-[270px]
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                                bg-[#fafafa]
                            "
                        >

                            {imagePreview ? (

                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <div className="text-center">

                                    <UploadCloud
                                        className="
                                            mx-auto
                                            w-11
                                            h-11
                                            text-gray-400
                                        "
                                    />

                                    <p className="mt-3 text-[13px] text-gray-500">
                                        Upload Product Image
                                    </p>

                                    <p className="text-[10px] text-gray-400 mt-1">
                                        JPG, PNG, JPEG, WEBP
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* CHOOSE IMAGE */}

                        <label
                            className="
                                inline-flex
                                items-center
                                mt-3
                                cursor-pointer
                                bg-[#3157d5]
                                hover:bg-[#2648bd]
                                text-white
                                px-4
                                py-2
                                rounded-md
                                text-[11px]
                                font-medium
                            "
                        >

                            Choose Image

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImage}
                                className="hidden"
                            />

                        </label>


                        {/* Selected file name */}

                        {imageFile && (

                            <p className="mt-2 text-[10px] text-gray-500 truncate">
                                Selected: {imageFile.name}
                            </p>

                        )}

                    </div>

                </div>


                {/* ================= SAVE ================= */}

                <div className="flex justify-end mt-7 pt-5 border-t border-gray-100">

                    <button
                        type="button"
                        onClick={saveItem}
                        className="
                            px-5
                            py-2.5
                            rounded-md
                            bg-[#3157d5]
                            hover:bg-[#2648bd]
                            text-white
                            text-[12px]
                            font-medium
                        "
                    >
                        Save Item
                    </button>

                </div>

            </div>


            {/* ================= AVAILABLE ITEMS ================= */}

            <div className="max-w-5xl mx-auto mt-7">

                <div className="mb-4">

                    <h2 className="text-[17px] font-semibold text-black">
                        Available Items
                    </h2>

                    <p className="text-[11px] text-gray-500 mt-1">
                        Products currently available in your shop
                    </p>

                </div>


                {/* NO ITEMS */}

                {products.length === 0 ? (

                    <div
                        className="
                            bg-white
                            border border-gray-200
                            rounded-lg
                            p-8
                            text-center
                            text-[12px]
                            text-gray-500
                        "
                    >
                        No Items Available
                    </div>

                ) : (

                    /* ================= PRODUCT GRID ================= */

                    <div className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        xl:grid-cols-4
                        gap-4
                    ">

                        {products.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    bg-white
                                    border border-gray-200
                                    rounded-lg
                                    p-3
                                    hover:border-gray-300
                                    transition
                                "
                            >

                                {/* IMAGE */}

                                <div
                                    className="
                                        w-full
                                        h-[130px]
                                        bg-gray-50
                                        border
                                        border-gray-100
                                        rounded-md
                                        flex
                                        items-center
                                        justify-center
                                        overflow-hidden
                                    "
                                >

                                    {item.image ? (

                                        <img
                                            src={`http://localhost:5000${item.image}`}
                                            alt={item.name}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <span className="text-[10px] text-gray-400">
                                            No Image
                                        </span>

                                    )}

                                </div>


                                {/* NAME */}

                                <h3 className="
                                    mt-3
                                    text-[13px]
                                    font-semibold
                                    text-black
                                    truncate
                                ">
                                    {item.name}
                                </h3>


                                {/* CATEGORY */}

                                <p className="
                                    text-[10px]
                                    text-gray-500
                                    mt-1
                                ">
                                    {item.category}
                                </p>


                                {/* PRICE + STOCK */}

                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                    mt-3
                                ">

                                    <span className="
                                        text-[12px]
                                        font-semibold
                                        text-black
                                    ">
                                        ₹{item.price}
                                    </span>

                                    <span className="
                                        text-[10px]
                                        text-gray-500
                                    ">
                                        Stock: {item.stock}
                                    </span>

                                </div>


                                {/* AVAILABILITY */}

                                <div className="mt-2">

                                    {Number(item.available) === 1 ? (

                                        <span className="
                                            text-[10px]
                                            font-medium
                                            text-green-600
                                        ">
                                            Available
                                        </span>

                                    ) : (

                                        <span className="
                                            text-[10px]
                                            font-medium
                                            text-red-500
                                        ">
                                            Not Available
                                        </span>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AddItem;