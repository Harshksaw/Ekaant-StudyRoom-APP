import * as React from "react"
import Svg, {   SvgProps,
    Path,
    Defs,
    Pattern,
    Use,
    Image,} from "react-native-svg"
const Profile = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <Path
        stroke={props.focused ? "#0077B6" : "#263238"}
      fill={props.focused ? "#0077B6" : "#263238"}
      d="M17 .334A16.667 16.667 0 0 0 4.75 28.267a16.667 16.667 0 0 0 24.5 0A16.666 16.666 0 0 0 17 .334Zm0 30a13.334 13.334 0 0 1-9.25-3.75 10 10 0 0 1 18.5 0 13.334 13.334 0 0 1-9.25 3.75Zm-3.333-16.667a3.333 3.333 0 1 1 6.666 0 3.333 3.333 0 0 1-6.666 0Zm14.85 10A13.333 13.333 0 0 0 22 18.034a6.666 6.666 0 1 0-10 0 13.333 13.333 0 0 0-6.516 5.633 13.2 13.2 0 0 1-1.817-6.666 13.333 13.333 0 1 1 26.667 0 13.2 13.2 0 0 1-1.817 6.666Z"
    />
  </Svg>
)

const Bookings = (props: SvgProps) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      fill="none"
      {...props}
    >
      <Path
      fill={props.focused ? "#0077B6" : "#263238"}
      stroke={props.focused ? "#0077B6" : "#263238"}
        d="M28.75 5A6.25 6.25 0 0 1 35 11.25v17.5A6.25 6.25 0 0 1 28.75 35h-17.5A6.25 6.25 0 0 1 5 28.75v-17.5A6.25 6.25 0 0 1 11.25 5h17.5Zm3.75 10h-25v13.75a3.75 3.75 0 0 0 3.75 3.75h17.5a3.75 3.75 0 0 0 3.75-3.75V15Zm-3.75-7.5h-17.5a3.75 3.75 0 0 0-3.75 3.75v1.25h25v-1.25a3.75 3.75 0 0 0-3.75-3.75Z"
      />
    </Svg>
  )

  const Home = (props: SvgProps) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      fill="none"
      {...props}
    >
      <Path
      stroke={props.focused ? "#0077B6" : "#263238"}
      fill={props.focused ? "#0077B6" : "#263238"}
        d="M32.111 10.83 20.778 1.373A5.833 5.833 0 0 0 17 0a5.833 5.833 0 0 0-3.778 1.373L1.89 10.83a5.414 5.414 0 0 0-1.404 1.838c-.326.7-.491 1.46-.485 2.225v15.713c0 1.43.597 2.803 1.66 3.814A5.815 5.815 0 0 0 5.667 36h22.666a5.815 5.815 0 0 0 4.007-1.58A5.265 5.265 0 0 0 34 30.606v-15.73a5.171 5.171 0 0 0-.488-2.216 5.415 5.415 0 0 0-1.4-1.83ZM20.778 32.404h-7.556v-8.989c0-.477.2-.934.553-1.271a1.939 1.939 0 0 1 1.336-.527h3.778c.5 0 .981.19 1.336.527.354.337.553.794.553 1.271v8.99Zm9.444-1.798c0 .477-.199.935-.553 1.272a1.938 1.938 0 0 1-1.336.526h-3.777v-8.989c0-1.43-.598-2.802-1.66-3.814a5.816 5.816 0 0 0-4.007-1.58H15.11a5.816 5.816 0 0 0-4.007 1.58 5.265 5.265 0 0 0-1.66 3.814v8.99H5.668c-.501 0-.982-.19-1.336-.527a1.755 1.755 0 0 1-.553-1.271V14.875c0-.255.058-.507.168-.74.111-.232.273-.44.474-.608l11.333-9.439A1.945 1.945 0 0 1 17 3.641c.459 0 .902.159 1.247.447l11.333 9.439c.202.168.363.376.474.608.11.233.168.485.168.74v15.732Z"
      />
    </Svg>
  )

  const Jobs = (props: SvgProps) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={40}
    height={40}

  fill={props.focused ? "#0077B6 " : "#263238"}


    {...props}
  >
    <Path fill="url(#a)" d="M0 0h40v40H0z" />
    <Defs>
      <Pattern
        id="a"
        width={3}
        height={3}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00781)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={128}
        height={128}
      />
    </Defs>
  </Svg>
)

  

export {
    Profile,
    Bookings,
    Home,
    Jobs
}

