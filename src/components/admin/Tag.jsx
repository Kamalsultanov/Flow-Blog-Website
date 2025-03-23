import React, { useState, useEffect, useRef } from "react";
import { BlockPicker, SliderPicker } from "react-color";
import { useTag } from "../../context/TagContext";
import { FaRegTrashCan } from "react-icons/fa6";

const Tag = () => {
  const {
    tags,
    colors,
    fetchTags,
    fetchColors,
    deleteColor,
    createColor,
    createTag,
    deleteTag,
  } = useTag();

  // ================== Color States =============
  const tooltipRef = useRef(null);
  const [color, setColor] = useState("#ff5733");
  const [colorMessage, setColorMessage] = useState("");
  const [isColorLoading, setIsColorLoading] = useState(false);
  const [colorName, setColorName] = useState("");
  const [hoveredColor, setHoveredColor] = useState(null);

  //  ================== Tag States =============
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetchColors();
    fetchTags();
  }, []);

  const handleTagInputChange = (e) => setTagName(e.target.value);
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const handleColorNameChange = (e) => {
    setColorName(e.target.value);
  };

  const handleSelectColor = (colorId, hexCode) => {
    setSelectedColor({ id: colorId, hexCode });
  };

  const handleCreateColor = async () => {
    if (!colorName.trim()) {
      setColorMessage("Color Name is Mandatory*");
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
      await createTag({ name: tagName, colorId: selectedColor.id });
      setMessage("Tag created successfully!");
      setTagName("");
      setSelectedColor("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create tag");
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorMouseEnter = (colorId) => {
    setHoveredColor(colorId);
  };

  const handleColorMouseLeave = () => {
    setHoveredColor(null);
  };

  const handleDeleteColorWithStopPropagation = (e, colorId) => {
    e.stopPropagation();
    handleDeleteColor(colorId);
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      fetchTags();
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  };

  const handleDeleteColor = async (colorId) => {
    try {
      await deleteColor(colorId);
      fetchColors();
    } catch (error) {
      console.error("Failed to delete color:", error);
    }
  };

  return (
    <section className="p-10 bg-onyx w-[80%]">
      <h1 className="text-3xl text-white">Tags</h1>

      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <h3 className="text-white text-2xl pb-5">Create Tag</h3>
            <div className="bg-matte rounded-t-md w-full">
              <h3 className="px-3 py-3 text-white">Choose color for tag:</h3>
              {colors.length > 0 ? (
                <div
                  className="grid grid-cols-2 md:grid-cols-7 gap-5 grid-rows-3 border border-white bg-slate-100 w-full 
                  p-3 h-36 rounded-sm mb-3 overflow-y-auto custom-scrollbar"
                >
                  {colors.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: item.hexCode,
                        border:
                          selectedColor && selectedColor.id === item.id
                            ? "3px solid black"
                            : "1px solid gray",
                        position: "relative",
                      }}
                      className="group  w-9 h-7 hover:scale-110 cursor-pointer transition-all duration-200"
                      onMouseEnter={() => handleColorMouseEnter(item.id)}
                      onMouseLeave={handleColorMouseLeave}
                    >
                      <div
                        ref={tooltipRef}
                        className={`absolute z-50 bg-onyx text-white p-2 rounded flex flex-col items-start shadow-lg 
                                   ${
                                     hoveredColor === item.id
                                       ? "block"
                                       : "hidden"
                                   } 
                                   top-full -left-2  
                                   w-auto  whitespace-nowrap`}
                      >
                        <p className="text-xs mb-1 border-b capitalize">
                          {item.name}
                        </p>
                        <button
                          className="text-xs text-green-400 py-1 w-full hover:text-green-700  transition-all duration-100  "
                          onClick={() =>
                            handleSelectColor(item.id, item.hexCode)
                          }
                        >
                          Choose
                        </button>
                        <button
                          className="text-xs text-red-400 hover:text-red-600"
                          onClick={(e) =>
                            handleDeleteColorWithStopPropagation(e, item.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white p-3">
                  No colors available. Create some colors first.
                </p>
              )}
              {selectedColor && (
                <div className="px-3 py-2 text-white">
                  Selected color:{" "}
                  <span
                    className="inline-block w-5 h-5 ml-2 align-middle"
                    style={{ backgroundColor: selectedColor.hexCode }}
                  ></span>
                </div>
              )}
            </div>
            <div className="w-full mt-4">
              <input
                type="text"
                name="tag"
                id="tag"
                className="w-full p-2"
                placeholder="Enter Tag name"
                disabled={isLoading}
                value={tagName}
                onChange={handleTagInputChange}
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
            <h3 className="text-white text-2xl pb-5">Create Color</h3>

            <div className="w-full relative">
              <div className="bg-matte rounded-t-md">
                <h3 className="px-3 py-3 text-white">Enter Color name:</h3>
                <div className="w-full">
                  <input
                    type="text"
                    name="colorName"
                    id="colorName"
                    className="w-full outline-none h-7 px-2 py-1 font-bold"
                    style={{ color: color }}
                    placeholder="matte, onyx etc.*"
                    value={colorName}
                    onChange={handleColorNameChange}
                    disabled={isColorLoading}
                  />
                </div>
              </div>
              <SliderPicker color={color} onChange={handleColorChange} />
              <button
                className="bg-aqua p-3 text-white mt-8"
                onClick={handleCreateColor}
                disabled={isColorLoading}
              >
                {isColorLoading ? "..." : "Create Color"}
              </button>
              {colorMessage && (
                <p
                  className={`mt-3 ${
                    colorMessage.includes("Failed") ||
                    colorMessage.includes("Mandatory")
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

      <div className="flex mt-10">
        <div className="w-full">
          <h3 className="text-white text-2xl pb-5 ">Existing Tags</h3>
          <div className="bg-matte p-4 rounded-md ">
            {tags && tags.length > 0 ? (
              <ul className="space-y-2 flex gap-5 items-center justify-center">
                {tags.map((tag) => {
                  const tagColorHex = tag.colorHexCode || "#cccccc";
                  return (
                    <li
                      key={tag.id}
                      className="flex items-center justify-center px-4   text-white border-2 border-gray-300  rounded-full overflow-hidden  py-2 min-w-16 relative group"
                      style={{ backgroundColor: tagColorHex }}
                    >
                      <div className="flex items-center">{tag.name}</div>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className=" absolute  w-full h-full flex items-center justify-center  text-red-600
                         opacity-0 group-hover:opacity-100 transition-all duration-300 hover:backdrop-blur-lg "
                      >
                        <FaRegTrashCan />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-white">No tags created yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tag;
