DROP TABLE IF EXISTS POOLTABLE;
CREATE TABLE POOLTABLE (
	user_email VARCHAR(128),
    course_id VARCHAR(20),
    PRIMARY KEY (user_email, course_id)
);
