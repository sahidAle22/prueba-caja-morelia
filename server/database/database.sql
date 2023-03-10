-- MySQL Script generated by MySQL Workbench
-- Sun Feb 26 18:54:00 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `cajamor` DEFAULT CHARACTER SET utf8 ;
USE `cajamor` ;

-- -----------------------------------------------------
-- Table `cajamor`.`TBL_CMV_CLIENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cajamor`.`TBL_CMV_CLIENTE` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido_paterno` VARCHAR(45) NOT NULL,
  `apellido_materno` VARCHAR(45) NOT NULL,
  `rfc` VARCHAR(13) NOT NULL,
  `curp` VARCHAR(18) NOT NULL,
  `fecha_alta` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cajamor`.`CAT_CMV_TIPO_CUENTA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cajamor`.`CAT_CMV_TIPO_CUENTA` (
  `id_cuenta` INT NOT NULL AUTO_INCREMENT,
  `nombre_cuenta` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_cuenta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cajamor`.`TBL_CMV_CLIENTE_CUENTA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cajamor`.`TBL_CMV_CLIENTE_CUENTA` (
  `id_cliente_cuenta` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_cuenta` INT NOT NULL,
  `saldo_actual` FLOAT NOT NULL,
  `fecha_contratacion` DATETIME(6) NOT NULL,
  `fecha_ultimo_movimiento` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id_cliente_cuenta`),
  INDEX `id_cliente_idx` (`id_cliente` ASC) VISIBLE,
  INDEX `id_cuenta_idx` (`id_cuenta` ASC) VISIBLE,
  CONSTRAINT `id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `cajamor`.`TBL_CMV_CLIENTE` (`id_cliente`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `id_cuenta`
    FOREIGN KEY (`id_cuenta`)
    REFERENCES `cajamor`.`CAT_CMV_TIPO_CUENTA` (`id_cuenta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



use cajamor;

-- Store Procedures

drop procedure if exists updateUser;
DELIMITER |
CREATE PROCEDURE updateUser(
	IN id INT,
	IN nom varchar(45), 
    IN ap varchar(45),
    IN am varchar(45),
    IN r varchar(13),
    IN c varchar(18)
)

BEGIN
	update tbl_cmv_cliente set nombre = nom, apellido_paterno=ap, apellido_materno=am, rfc = r, curp= c Where id_cliente = id;
END 
|

drop procedure if exists getInfoAccount;
DELIMITER |
CREATE PROCEDURE getInfoAccount(
	IN id INT
)

BEGIN 
		select t1.id_cuenta, t2.nombre_cuenta, t1.saldo_actual, t1.fecha_contratacion, t1.fecha_ultimo_movimiento from tbl_cmv_cliente_cuenta as t1 CROSS JOIN cat_cmv_tipo_cuenta as t2 ON t1.id_cuenta = t2.id_cuenta AND t1.id_cliente = id;
END
|

drop procedure if exists getClients;
DELIMITER |
CREATE PROCEDURE getClients()

BEGIN 
	SELECT * FROM tbl_cmv_cliente;
END
|

drop procedure if exists getClient;
DELIMITER |

CREATE PROCEDURE getClient(IN id INT)
BEGIN
	select * from tbl_cmv_cliente where id_cliente = id; 
END
|

drop procedure if exists deleteClient;
DELIMITER |

CREATE PROCEDURE deleteClient (IN id INT)
BEGIN
	DELETE FROM TBL_CMV_CLIENTE WHERE id_cliente = id;
END
|

-- Insercion de Registros (Clientes y Cuentas)

INSERT INTO cat_cmv_tipo_cuenta(nombre_cuenta) VALUES ("Corriente");
INSERT INTO cat_cmv_tipo_cuenta(nombre_cuenta) VALUES ("Ahorro");
INSERT INTO cat_cmv_tipo_cuenta(nombre_cuenta) VALUES ("Nomina");
INSERT INTO cat_cmv_tipo_cuenta(nombre_cuenta) VALUES ("Chequera");

INSERT INTO tbl_cmv_cliente(nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta) VALUES ("Sahid Alejandro","Mora","Reyes","QUMA470929F37","MORS001105HMNRYHA9","2020-01-01 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (1,1,1000,"2020-01-01 10:10:10","2022-01-01 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (1,2,2000,"2020-01-01 10:10:10","2022-01-01 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (1,3,3000,"2020-01-01 10:10:10","2022-01-01 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (1,4,4000,"2020-01-01 10:10:10","2022-01-01 10:10:10");

INSERT INTO tbl_cmv_cliente(nombre,apellido_paterno,apellido_materno,rfc,curp,fecha_alta) VALUES ("Citlali Adriana","Sanchez","Garcia","CUPU800825569","MORS001105HMNRYHA9","2022-02-02 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (2,1,6000,"2020-02-03 10:10:10","2022-05-05 10:10:10");
INSERT INTO tbl_cmv_cliente_cuenta(id_cliente, id_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento) VALUES (2,2,7000,"2020-02-03 10:10:10","2022-05-05 10:10:10");


INSERT INTO tbl_cmv_cliente(nombre,apellido_paterno,apellido_materno,rfc,curp,fecha_alta) VALUES ("Lizbeth","Jauregui","Calvillo","JACL841028Q62","JACL841028MJCRLZ00","2022-03-03 10:10:10");