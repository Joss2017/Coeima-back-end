CREATE TABLE users(
id UUID PRIMARY KEY,
role VARCHAR(25) NOT NULL,
nickname VARCHAR(25) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT null,
phone varchar(10)
);
CREATE TABLE message (
id UUID PRIMARY KEY,
date_creation DATE,
body TEXT NOT NULL,
is_read BOOLEAN,
id_Sender UUID,
id_Receiver UUID,
constraint  fk_users foreign key (id_Sender) REFERENCES users(id) ON DELETE cascade,
 foreign key (id_Receiver) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE offer (
id UUID PRIMARY KEY,
title VARCHAR(255) NOT NULL,
picture VARCHAR(255) NOT NULL,
body TEXT NOT NULL,
price float NOT NULL,
users_id UUID,
constraint  fk_users foreign key (users_id) REFERENCES users(id) ON DELETE cascade);

CREATE TABLE topic (
id UUID PRIMARY KEY,
date_creation DATE,
title VARCHAR(255) NOT NULL,
body TEXT NOT NULL,
favorites BOOLEAN,
url VARCHAR(255),
tag BOOLEAN,
users_id UUID,
constraint  fk_users foreign key (users_id) REFERENCES users(id) ON DELETE cascade
);
CREATE TABLE comment (
id UUID PRIMARY KEY,
date creation DATE,
title VARCHAR(255) NOT NULL,
url VARCHAR(255)
body TEXT NOT NULL,
users_id UUID,
topic_id,
constraint  fk_users foreign key (users_id) REFERENCES users(id) ON DELETE cascade,
constraint  fk_topic foreign key (topic_id) REFERENCES topic(id) ON DELETE cascade
);