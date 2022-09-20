CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    user_password VARCHAR(64) NOT NULL,
    user_date_created DATETIME NOT NULL
) ENGINE = InnoDB;

INSERT INTO
    users (user_name, user_password, user_date_created)
VALUES
    ('Vincent', 'password', CURRENT_TIMESTAMP()),
    ('Tommy', 'password', CURRENT_TIMESTAMP()),
    ('Logan', 'password', CURRENT_TIMESTAMP()),
    ('Trevor', 'password', CURRENT_TIMESTAMP());