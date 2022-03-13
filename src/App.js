import {useState, useRef} from 'react'
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core'
import QRCode from 'qrcode'
import {QrReader} from 'react-qr-reader'

function App() {

  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef= useRef(null);

  const classes= useStyles();

  const generateQR = async ()=>{
    try{
      const response = await QRCode.toDataURL(text)
      setImageUrl(response);
    }catch(err){
      console.log(err);
    }
  }

  const handleErrorFile = (error)=>{
    console.log(error);
  }

  const handleScanFile = (result)=>{
    if (result){
      setScanResultFile(result);
    }
  }

  const onScanFile = ()=>{
    console.log('clicked')
    qrRef.current.openImageDialog();
  }

  const handleErrorWebCamera = (error)=>{
    console.log(error)
  }

  const handleScanWebcam = (result)=>{
    if (result){
    setScanResultWebCam(result);
    }
  }


  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}> QR code generator and reader by ReactJS</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter your URL here" onChange={(e)=> setText(e.target.value)} />
              <Button 
              className={classes.btn} 
              variant="contained" 
              color="primary" 
              onClick={()=> generateQR()}
              >
                Generate
              </Button>
              <br/>
              <br/>
              <br/>
              {imageUrl ? 
              (<a href={imageUrl} download>
                <img src={imageUrl} alt='img' />
                </a>): 
                null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button 
              className={classes.btn} 
              variant='contained' 
              color='secondary' 
              onClick={onScanFile}
              >
                Scan a QR code
              </Button>
              <QrReader 
              ref={qrRef}
              delay={300} 
              style={{width: '100%'}} 
              onError={handleErrorFile}
              onScan={handleScanFile}
              onResult={()=>{}}
              legacyMode
              />
              <h3>Scanned code: {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR code scan by WebCam</h3>
              <QrReader
              delay={300}
              style={{width: '100%'}}
              onError={handleErrorWebCamera}
              onScan={handleScanWebcam}
              onResult={()=>{}}
              />
              <h3>Scanned by Webcam code: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>  
  );
}

const useStyles = makeStyles((theme)=>({
  container:{
    marginTop: 10
  },
  title: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:'#3f51b5',
    color:'white',
    padding: 20,
  },
  btn:{
    marginTop: 10,
    marginBottom: 20
  }
}));

export default App;
