import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/bio"
import Card from "../components/card"
import SEO from "../components/seo"

import markImg from "../images/mark-jefferson-paraan-321030-unsplash.jpg"
import codeImg from "../images/fabian-grohs-437907-unsplash.jpg"

const ARTICLES = [
  {
    title: "Why We Keep Hustling?",
    description:
      "This is a story for you who never give up, chasing a dream with passion and soul.",
    dateTime: "23/02/19",
    readTime: "8",
    coverImage: markImg,
  },
  {
    title: "How to Write Clean Code",
    description: "This is a tutorial to writing clean code in Javascript.",
    dateTime: "26/02/19",
    readTime: "12",
    coverImage: codeImg,
  },
]

class IndexPage extends Component {
  render() {
    const { data } = this.props
    const {
      site: { siteMetadata },
      allMarkdownRemark: { totalCount, edges },
    } = data

    console.log(data)
    console.log("site meta data", siteMetadata)
    console.log("site markdown", edges)

    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Bio
          name={siteMetadata.author}
          description={siteMetadata.authorDescription}
        />
        <div className="card-list">
          {edges.map(({ node }) => {
            return (
              <Card
                key={node.id}
                title={node.frontmatter.title}
                description={node.excerpt}
                dateTime={node.frontmatter.date}
                readTime={node.timeToRead}
                coverImage={markImg}
                linkPost={node.fields.slug}
              />
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        authorDescription
      }
    }
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          timeToRead
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`