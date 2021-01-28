<<<<<<< HEAD
# Création réseau sociaux pour entreprise Groupomania
=======
#titre Création réseau sociaux pour entreprise Groupomania
>>>>>>> 3dd35a9d826bd993002cbf48d6453be02440fa63

_ATTENTION! Cette application nécessite Node.js !_

Cloner le projet dans un de vos dossier.


<<<<<<< HEAD
# Pour la base de données :
- mysql doit être installé et configuré avec un nom d'utilisateur, un mot de base et la création d'une base de donnée (CREATE DATABASE _nom de la base de donnée a créée_).
- écrire les configurations dans le fichier backend/config/config.json.


# Pour le frontend dans le dossier frontend/ :

- lancer dans un terminal : npm run serve
- l'application devrait tourner sur http://localhost:8080/
*certains modules devront être installé via npm install (nom du module)*



# Pour le backend dans le dossier backend/ :
>>>>>>> 3dd35a9d826bd993002cbf48d6453be02440fa63
lancer dans un terminal: nodemon start
*de même que pour la partie frontend, des modules devront être installés*
un message indiquant que mysql se lance correctement devrait apparaitre dans votre terminale :


_Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `imageUrl` VARCHAR(255) DEFAULT 'https://asbl.cefig.be/wp-content/uploads/2017/05/630729-200.png', `firstName` VARCHAR(255), `lastName` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Users` FROM `db_P7`
Executing (default): CREATE TABLE IF NOT EXISTS `Posts` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255), `content` VARCHAR(255), `imageUrl` VARCHAR(255), `avatar` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Posts` FROM `db_P7`
Executing (default): CREATE TABLE IF NOT EXISTS `Comments` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(255), `avatarCom` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `PostId` INTEGER, `UserId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) 
ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Comments` FROM `db_P7`
Executing (default): SELECT `id`, `imageUrl`, `firstName`, `lastName`, `email`, `password`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`email` = 'vivi_c@hotmail.fr' LIMIT 1;
Executing (default): SELECT `User`.`id`, `User`.`imageUrl`, `User`.`firstName`, `User`.`lastName`, `User`.`email`, `User`.`password`, `User`.`createdAt`, `User`.`updatedAt`, `Posts`.`id` AS `Posts.id`, `Posts`.`title` AS `Posts.title`, `Posts`.`content` AS `Posts.content`, `Posts`.`imageUrl` AS `Posts.imageUrl`, `Posts`.`avatar` AS `Posts.avatar`, `Posts`.`createdAt` AS `Posts.createdAt`, `Posts`.`updatedAt` AS `Posts.updatedAt`, `Posts`.`UserId` AS `Posts.UserId` FROM 
`Users` AS `User` LEFT OUTER JOIN `Posts` AS `Posts` ON `User`.`id` = `Posts`.`UserId` WHERE `User`.`id` = '1';
Executing (default): SELECT `Post`.`id`, `Post`.`title`, `Post`.`content`, `Post`.`imageUrl`, `Post`.`avatar`, `Post`.`createdAt`, `Post`.`updatedAt`, `Post`.`UserId`, `User`.`id` AS `User.id`, `User`.`firstName` AS `User.firstName` FROM `Posts` AS `Post` LEFT OUTER JOIN `Users` AS `User` ON `Post`.`UserId` = `User`.`id` ORDER BY `Post`.`updatedAt` DESC;
Executing (default): SELECT `User`.`id`, `User`.`imageUrl`, `User`.`firstName`, `User`.`lastName`, `User`.`email`, `User`.`password`, `User`.`createdAt`, `User`.`updatedAt`, `Posts`.`id` AS `Posts.id`, `Posts`.`title` AS `Posts.title`, `Posts`.`content` AS `Posts.content`, `Posts`.`imageUrl` AS `Posts.imageUrl`, `Posts`.`avatar` AS `Posts.avatar`, `Posts`.`createdAt` AS `Posts.createdAt`, `Posts`.`updatedAt` AS `Posts.updatedAt`, `Posts`.`UserId` AS `Posts.UserId` FROM 
`Users` AS `User` LEFT OUTER JOIN `Posts` AS `Posts` ON `User`.`id` = `Posts`.`UserId` WHERE `User`.`id` = '1';_



<<<<<<< HEAD





=======
>>>>>>> 3dd35a9d826bd993002cbf48d6453be02440fa63

