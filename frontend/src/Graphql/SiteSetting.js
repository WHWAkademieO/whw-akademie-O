import { gql } from "@apollo/client";

export const siteSettingQuery = gql`
  query GetPageData {
    siteSettings {

      siteTitle {
        siteTitle 
      }

      siteSettings {
       
        siteUrl
        fieldGroupName
        title
        siteLogo {
          sourceUrl
        }
        openGraphImage {
          sourceUrl
        }
        socialMedia {
          facebookUrl
          instagramUrl
        }
      }

      GlobalSEO {
        fieldGroupName
        openGraphImage {
          sourceUrl
        }
        robotsMeta
      }
    }
  }
`;
