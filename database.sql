/* CREATE TABLE */
CREATE TABLE `customers` (
  `id` int NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* ALTER TABLE AND ADD AUTO_INCREMENT */
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
