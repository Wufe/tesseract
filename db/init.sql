create database if not exists tesseract;
use tesseract;

create table if not exists files (
    id int not null AUTO_INCREMENT primary key,
    uuid varchar(36) unique,
    mime varchar(100),
    name varchar(500),
    bytesOriginal bigint,
    bytesEncoded bigint,
    size varchar(10)
);