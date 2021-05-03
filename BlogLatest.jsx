import React from "react";
import { blogLatestProps } from "../blogs/blogProps";
import * as blogService from "../../services/blogService";
import { Grid, Card, Button, List } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { BarLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogSingle from "./BlogSingle";
import debug from "sabio-debug";

const _logger = debug.extend("Latestblogs");

class BlogLatest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedBlogs: [],
      pageIndex: 0,
      pageSize: 10,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = () => {
    blogService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.getAllBlogsSuccess)
      .catch(this.onGetAllError);
  };

  getAllBlogsSuccess = (res) => {
    let blogs = res.item.pagedItems.filter((blog) => blog.statusType.Id !== 7);
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedBlogs: [...prevState.mappedBlogs, blogs.map(this.mapSingleBlog)],
        pageIndex: this.state.pageIndex + 1,
      };
    });
  };

  mapSingleBlog = (blog) => {
    return (
      <BlogSingle blog={blog} readBlog={this.readBlogClicked} key={blog.id} />
    );
  };

  onGetAllError = (response) => {
    _logger({ error: response });
  };

  readBlogClicked = (blog) => {
    this.props.history.push(`/blogs/${blog.id}`, blog);
  };

  goToBlogs = () => {
    this.props.history.push("/blogs");
  };

  render() {
    return (
        <Grid container spacing={4}>
          <Grid item xs={12} xl={6}>
            <Card className="card-box mb-4">
              <div
                className="card-header pr-1"
                style={{ backgroundColor: "#5E3267" }}
              >
                <div className="card-header--title">
                  <small
                    className="d-block text-uppercase mt-1"
                    style={{ color: "white" }}
                  >
                    Blogs
                  </small>
                  <b style={{ color: "white" }}>Latest Blogs</b>
                </div>
                <div className="card-header--actions">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className="mr-3 bg-strong-bliss text-white"
                    onClick={this.goToBlogs}
                  >
                    Read More Blogs
                  </Button>
                </div>
              </div>
              <div id="scrollableDivOne" className="scroll-area-lg">
                <List>
                  <InfiniteScroll
                    dataLength={this.state.mappedBlogs.length}
                    next={this.getBlogs}
                    hasMore={this.state.hasMore}
                    scrollThreshold={0.8}
                    scrollableTarget="scrollableDivOne"
                    loader={
                      <div className="d-flex align-items-center justify-content-center py-3">
                        <BarLoader color={"var(--primary)"} loading={true} />
                      </div>
                    }
                    endMessage={
                      <div className="mb-2">
                        <MuiAlert severity="success">
                          This is the end of the list!
                        </MuiAlert>
                      </div>
                    }
                  >
                    {this.state.mappedBlogs}
                  </InfiniteScroll>
                </List>
              </div>
              <div
                className="card-footer d-flex justify-content-between"
                style={{ backgroundColor: "#5E3267" }}
              ></div>
            </Card>
          </Grid>
        </Grid>
    );
  }
}

BlogLatest.propTypes = blogLatestProps;
export default BlogLatest;
