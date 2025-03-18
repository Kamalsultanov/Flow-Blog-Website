import React, { useState } from "react";
import { BlockPicker, SliderPicker } from "react-color";
import { useTag } from "../../Context/TagContext";

const Tag = () => {
  const {
    tags,
    colors,
    loading,
    error,
    fetchTags,
    fetchColors,
    deleteColor,
    createColor,
    createTag,
    deleteTag,
  } = useTag();

  const [color, setColor] = useState("#ff5733");
  const [colorMessage, setColorMessage] = useState("");
  const [isColorLoading, setIsColorLoading] = useState(false);

  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [colorName, setColorName] = useState("");

  const handletagInputChange = (e) => setTagName(e.target.value);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleColorNameChange = (e) => {
    setColorName(e.target.value);
  };

  const handleCreateColor = async () => {
    if (!colorName.trim()) {
      setColorMessage("Please enter a color name");
      return;
    }

    setIsColorLoading(true);
    try {
      await createColor({ name: colorName, hexCode: color });
      setColorMessage("Color created successfully!");
      setColorName(""); 
      fetchColors();
    } catch (error) {
      setColorMessage(
        error.response?.data?.message || "Failed to create color"
      );
    } finally {
      setIsColorLoading(false);
    }
  };

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      setMessage("Please enter a category name");
      return;
    }

    setIsLoading(true);
    try {
      await createTag({ name: tagName });
      setMessage("Tag created successfully!");
      setTagName("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create tag");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-10 bg-onyx w-[80%]">
      <h1 className="text-3xl text-white">Tags</h1>

      <div className=" mt-10">
        <div className=" grid   grid-cols-1 sm:grid-cols-2  gap-5 ">
          <div>
            <h3 className="text-white tex-2xl pb-5">Create Tag</h3>
            {colors.length > 0 ? (
              <div className="bg-matte rounded-t-md ">
                <h3 className="px-3 py-3 text-white">Choose color for tag:</h3>
                <div className=" grid grid-cols-12 gap-1 grid-rows-4  border border-white bg-slate-100 p-3 rounded-sm mb-3 overflow-y-scroll custom-scrollbar  ">
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      style={{ background: color.hexCode }}
                      className=" overflow-hidden w-9 h-7 hover:scale-110 cursor border  transition-all duration-200"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="w-full">
              <input
                type="text"
                name="tag"
                id="tag"
                className="w-full p-2"
                placeholder="Enter Tag name"
                disabled={isLoading}
                value={tagName}
                onChange={handletagInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
              />
            </div>
            <button
              className="bg-aqua p-3 text-white mt-8"
              onClick={handleCreateTag}
              disabled={isLoading}
            >
              {isLoading ? "...." : "Add Tag"}
            </button>
            {message && (
              <p
                className={`mt-3 ${
                  message.includes("Failed") ? "text-red-400" : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-white tex-2xl pb-5">Create Color</h3>

            <div className="w-full relative">
              <div className="w-full">
                <input
                  type="text"
                  name="colorName"
                  id="colorName"
                  className="w-full outline-none h-7 px-2 py-1 font-bold"
                  style={{ color: color }}
                  placeholder="Enter Color name"
                  value={colorName}
                  onChange={handleColorNameChange}
                  disabled={isColorLoading}
                />
              </div>
              <SliderPicker color={color} onChange={handleColorChange} />
              <button
                className="bg-aqua  p-3  text-white mt-8 "
                onClick={handleCreateColor}
                disabled={isColorLoading}
              >
                {isColorLoading ? "..." : "Create Color"}
              </button>
              {colorMessage && (
                <p
                  className={`mt-3 ${
                    colorMessage.includes("Failed")
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {colorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>Tags</div>
        <div>Colors</div>
      </div>
    </section>
  );
};

export default Tag;
