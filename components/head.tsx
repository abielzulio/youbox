import NextHead from "next/head"

interface HeadProps {
  title: string
}

const Head = (props: HeadProps) => {
  const title = props.title + " | YouBox"
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  )
}

export default Head
