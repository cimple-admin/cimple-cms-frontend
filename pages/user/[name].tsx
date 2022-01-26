import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const UserName: NextPage = ({ data }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data}
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context:any) {
    // 拿到参数
    console.log(context.params.name)
    let userName = context.params.name
    // 发送请求
    const res = await fetch("http://127.0.0.1:8080/user/" + userName)
    const data = await res.text()
    console.log(data)
    return {
      props: {data}, // will be passed to the page component as props
    }
  }
  

export default UserName;
