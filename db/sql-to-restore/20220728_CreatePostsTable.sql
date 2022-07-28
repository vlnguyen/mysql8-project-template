CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    post_user_id INT NOT NULL,
    post_body TEXT NOT NULL,
    post_date_created DATETIME NOT NULL,
    CONSTRAINT FK_post_user_id_user_id FOREIGN KEY (post_user_id) REFERENCES users(user_id)
) ENGINE = InnoDB;

INSERT INTO
    posts (post_user_id, post_body, post_date_created)
VALUES
    (
        1,
        "This is Vincent's first post.",
        CURRENT_TIMESTAMP()
    ),
    (
        1,
        "This is Vincent's second post.",
        CURRENT_TIMESTAMP()
    ),
    (
        1,
        "This is Vincent's third post.",
        CURRENT_TIMESTAMP()
    ),
    (
        3,
        "This is Logan's only post.",
        CURRENT_TIMESTAMP()
    );