import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { TiDeleteOutline } from "react-icons/ti";

export default function FavoriteCard({ index, image, cloth, item, onRemove, onAdd }) {
  //console.log("image", image);
  return (
    <Tilt className="xs:w-[250px] ">
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)} className="green-pink-gradient p-[1px] rounded-[20px] shadow-card relative">
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <div
            style={{
              width: "300px", // Фиксированный размер изображения
              height: "300px", // Фиксированный размер изображения
              borderRadius: "20px", // Радиус границы изображения
              backgroundColor: "#ffffff", // Непрозрачный фон
              padding: "4px", // Внутренний отступ для градиентной границы
              background: "linear-gradient(to right, green, pink)", // Градиентная граница
              position: "relative", // Для позиционирования кнопки удаления
            }}
          >
            <img
              src={image}
              alt={cloth}
              style={{
                width: "100%", // Фиксированный размер изображения
                height: "100%", // Фиксированный размер изображения
                objectFit: "contain", // Подгонка изображения
                borderRadius: "20px", // Радиус границы изображения
                backgroundColor: "#ffffff", // Непрозрачный фон
              }}
            />

            <button
              type="button"
              style={{ fontSize: "50px", position: "absolute", top: "10px", right: "10px" }}
              className="remove-item"
              onClick={() => onRemove(item)}
            >
              <TiDeleteOutline />
            </button>
          </div>
          <h3 className="text-white text-[20px] font-bold text-center">{cloth}</h3>
          <button onClick={() => onAdd(item)} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Add to cart
          </button>
        </div>
      </motion.div>
    </Tilt>
  );
}
