import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const generateJsonString = data => {
  try {
    let result;
    switch (true) {
      case typeof data === "string": {
        result = JSON.parse(data);
        break;
      }
      case typeof data === "object": {
        result = data || {};
        break;
      }
      case Array.isArray(data): {
        result = data;
        break;
      }
      default: {
        result = [];
      }
    }
    return result;
  } catch (e) {
    return [];
  }
};

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
  fetch,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const getPages = async () => {
  return await client
    .query({
      query: gql`
        query NewQuery {
          pages {
            edges {
              node {
                title
                uri
                slug
              }
            }
          }
        }
      `,
    })
    .then(result => {
      const nodes = result.data?.pages?.edges;
      if (!nodes) return [];
      const data = nodes.map(ele => ele.node);
      return data;
    });
};

const getPosts = async () => {
  return await client
    .query({
      query: gql`
        query NewQuery {
          posts {
            edges {
              node {
                title
                uri
                slug
                id
              }
            }
          }
        }
      `,
    })
    .then(result => {
      const nodes = result.data?.posts?.edges;
      if (!nodes) return [];
      const data = nodes.map(ele => {
        return { __typename: "News", ...ele.node };
      });
      return data;
    })
    .catch(err => console.log(err));
};

const getDownload = async () => {
  return await client
    .query({
      query: gql`
        query NewQuery {
          page(id: "/download", idType: URI) {
            download {
              download {
                fieldGroupName
                title
                file {
                  id
                  mediaItemUrl
                  title
                }
              }
            }
          }
        }
      `,
    })
    .then(result => {
      const nodes = result.data?.page?.download.download;
      if (!nodes) return [];
      return nodes;
    });
};

const getEvent = async () => {
  return await client
    .query({
      query: gql`
        query NewQuery {
          page(id: "/eventkalender/", idType: URI) {
            editorBlocks {
              ... on CreateBlockEventBlocks {
                attributes {
                  events
                }
              }
            }
          }
        }
      `,
    })
    .then(result => {
      const blocks = result?.data?.page?.editorBlocks;
      const eventBlock = blocks?.find(
        block => block.__typename === "CreateBlockEventBlocks"
      );
      const eventData = generateJsonString(eventBlock?.attributes?.events);
      return eventData?.map(event => ({
        __typename: "Event",
        id: event?.id,
        date: event?.date,
        slug: event?.slug,
        title: event?.title?.rendered,
        event: event?.acf,
      }));
    });
};
const getThankyouText = async () => {
  return await client
    .query({
      query: gql`
        query NewQuery {
          siteSettings {
            siteSettings {
              thankYouText
            }
          }
        }
      `,
    })
    .then(result => {
      const thankyouText =
        result.data?.siteSettings?.siteSettings?.thankYouText || "";
      return thankyouText;
    });
};

const getAllData = async () => {
  let final = [];
  let thankyouText = "";
  await getPages().then(data => {
    final = final.concat(data);
  });

  await getPosts().then(data => {
    final = final.concat(data);
  });

  await getDownload().then(data => {
    final = final.concat(data);
  });

  await getEvent().then(data => {
    final = final.concat(data);
  });

  return final;
};
export default getAllData;
