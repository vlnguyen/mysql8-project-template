CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    user_date_created DATETIME NOT NULL
) ENGINE = MyISAM;

INSERT INTO
    users (user_name, user_date_created)
VALUES
    ('Vincent', CURRENT_TIMESTAMP()),
    ('Tommy', CURRENT_TIMESTAMP()),
    ('Logan', CURRENT_TIMESTAMP()),
    ('Trevor', CURRENT_TIMESTAMP())