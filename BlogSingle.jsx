import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { singleBlogProps } from "../blogs/blogProps";
import { Card, Button, List, ListItem } from "@material-ui/core";

const BlogSingle = (props) => {
  const readBlogClicked = () => {
    props.readBlog(props.blog);
  };

  return (
    <div className="scroll-area-sm shadow-overflow">
        <List>
          <ListItem className="py-4">
            <div className="d-flex flex-column flex-sm-row align-items-start">
              <div>
                <Card className="card-transparent mb-3 mb-sm-0">
                  <a className="card-img-wrapper rounded">
                    <img
                      alt="..."
                      className="card-img-top rounded"
                      src={props.blog.imageUrl}
                      style={{ width: 180 }}
                    />
                  </a>
                </Card>
              </div>
              <div className="pl-0 pl-sm-4">
                <div className="mb-1">
                  <a
                    className="font-size-lg"
                    href="#/"
                    onClick={readBlogClicked}
                  >
                    {props.blog.title}
                  </a>
                </div>
                <div>
                  <p className="mb-0 mt-2 text-black-50">
                    {props.blog.subject}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className="m-3 bg-amy-crisp text-white"
                    onClick={readBlogClicked}
                  >
                    Read Blog
                  </Button>
                </div>
              </div>
            </div>
          </ListItem>
        </List>
    </div>
  );
};

BlogSingle.propTypes = singleBlogProps;

export default BlogSingle;
