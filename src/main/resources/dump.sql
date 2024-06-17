-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: event_planner
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
                          `id` int NOT NULL AUTO_INCREMENT,
                          `moniker` varchar(100) NOT NULL,
                          `first_name` varchar(100) DEFAULT NULL,
                          `last_name` varchar(100) DEFAULT NULL,
                          `email` varchar(100) DEFAULT NULL,
                          `booking_fee` decimal(10,0) DEFAULT NULL,
                          `event_id` int DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `artist_pk_2` (`id`),
                          KEY `artist_fk` (`event_id`),
                          CONSTRAINT `artist_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` (`id`, `moniker`, `first_name`, `last_name`, `email`, `booking_fee`, `event_id`) VALUES (1,'Dj personjjm','Jim4j','Jamesj','jimjames@event_id.comj',500,12),(3,'Dj people','Jane','Janes','jane@event_id.com',200,13),(4,'Dj Best','Sarah','Johnson','sjohnson@event_id.com',1000,12),(5,'Dj Worst','Paulo','Johnson','djworst@event_id.com',100,11),(6,'Dj Happys','Edmonds','Edwards','e.edwards@event_id.com',230,11),(7,'Dj Sad','Alana','Porter','djsad@event_id.com',455,12);
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `event_name` varchar(150) NOT NULL,
                         `notebook_id` int NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `event_pk_2` (`id`),
                         KEY `notebook_id` (`notebook_id`),
                         CONSTRAINT `notebook_id` FOREIGN KEY (`notebook_id`) REFERENCES `notebook` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`id`, `event_name`, `notebook_id`) VALUES (1,'RIN',1),(2,'S. Bar',1),(3,'J jams',4),(4,'Patio takeover',5),(5,'Patio takeover',5),(10,'LFF',6),(11,'RIN @ HNS 20234',3),(12,'Jams',3),(13,'Jams',4),(14,'RIN',1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_details`
--

DROP TABLE IF EXISTS `event_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_details` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `date` date DEFAULT NULL,
                                 `start_time` time DEFAULT NULL,
                                 `end_time` time DEFAULT NULL,
                                 `event_id` int DEFAULT NULL,
                                 PRIMARY KEY (`id`),
                                 UNIQUE KEY `event_details_pk_2` (`id`),
                                 KEY `event_id` (`event_id`),
                                 CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_details`
--

LOCK TABLES `event_details` WRITE;
/*!40000 ALTER TABLE `event_details` DISABLE KEYS */;
INSERT INTO `event_details` (`id`, `date`, `start_time`, `end_time`, `event_id`) VALUES (1,'2024-01-27','07:12:52','09:13:16',10),(2,'2024-02-24','07:14:03','12:14:07',11),(3,'2024-03-10','10:16:00','11:20:00',12),(4,'2024-01-16','12:16:05','14:16:11',13);
/*!40000 ALTER TABLE `event_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `location_name` varchar(100) NOT NULL,
                            `phone_number` varchar(20) DEFAULT NULL,
                            `address` varchar(100) DEFAULT NULL,
                            `address_2` varchar(100) DEFAULT NULL,
                            `city` varchar(100) DEFAULT NULL,
                            `state` varchar(2) DEFAULT NULL,
                            `zip` varchar(10) DEFAULT NULL,
                            `website` varchar(100) DEFAULT NULL,
                            `accessibility` tinyint(1) DEFAULT NULL,
                            `event_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `location_pk_2` (`id`),
                            KEY `eventId` (`event_id`),
                            CONSTRAINT `eventId` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `location_name`, `phone_number`, `address`, `address_2`, `city`, `state`, `zip`, `website`, `accessibility`, `event_id`) VALUES (1,'High Noon Saloon','608-123-3333','701 East Washington Ave',NULL,'Madison','WI','53703','https://www.highnoon.com',1,14),(2,'Quarters','608-222-3333','301 E Center Ave',NULL,'Milwaukee','WI','53702','https://www.quarters.com',0,11),(3,'Sylvee','608-111-1555','102 East Washington Ave',NULL,'Madison','WI','53704','https://www.sylvee.com',1,10),(4,'Smart Bar','312-111-4444','305 Clark St',NULL,'Chicago','IL','61802','https://www.smartbar.com',1,12);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notebook`
--

DROP TABLE IF EXISTS `notebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notebook` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `title` varchar(150) NOT NULL,
                            `user_id` int NOT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `notebook_pk_2` (`id`),
                            KEY `user_id` (`user_id`),
                            CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notebook`
--

LOCK TABLES `notebook` WRITE;
/*!40000 ALTER TABLE `notebook` DISABLE KEYS */;
INSERT INTO `notebook` (`id`, `title`, `user_id`) VALUES (1,'RIN Showcase',1050),(2,'January Events',1050),(3,'February Events',1050),(4,'April Events',1050),(5,'May Events',1050),(6,'Spring Parties',1050);
/*!40000 ALTER TABLE `notebook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `first_name` varchar(100) NOT NULL,
                        `last_name` varchar(100) NOT NULL,
                        `email` varchar(100) NOT NULL,
                        `username` varchar(50) NOT NULL,
                        `password` varchar(100) NOT NULL,
                        `date_of_birth` date NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `user_pk_2` (`id`),
                        UNIQUE KEY `user_pk_3` (`username`),
                        UNIQUE KEY `user_pk_4` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `username`, `password`, `date_of_birth`) VALUES (1,'Joe','Coyne','jcoyne@email.com','jcoyne','supersecret1','1964-04-01'),(2,'Fred','Hensen','fhensen@email.com','fhensen','supersecret2','1988-05-08'),(3,'Barney','Curry','bcurry@email.com','bcurry','supersecret3','1947-11-11'),(4,'Karen','Mack','kmack@email.com','kmack','supersecret4','1986-07-08'),(5,'Dianne','Klein','dklein@email.com','dklein','supersecret5','1991-09-22'),(6,'Dawn','Tillman','dtillman@email.com','dtillman','supersecret6','1979-08-30'),(1048,'Glynis','Fisher','gcadagfisher@email.com','gfisher9','wahoo11','1992-08-11'),(1049,'Glynis','Fisher','gcadagfisher2@email.com','gfisher4','wahoo11','1992-08-11'),(1050,'Glynis','Fisher','glyniscfisher@gmail.com','gfisher','Woohoo081192!','1992-08-11');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24  9:44:49
