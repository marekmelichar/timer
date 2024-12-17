import React, { useState, useEffect, useRef } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

export const CountDownTimer: React.FC = () => {
  const matchesMax320 = useMediaQuery('(max-width:320px)')
  const matchesMax540 = useMediaQuery('(max-width:540px)')

  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0) // Time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [sets, setSets] = useState<number>(0) // Counter for completed sets
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioReady, setAudioReady] = useState<boolean>(false)

  // Ensure audio can play on mobile after user interaction
  const prepareAudio = () => {
    if (audioRef.current && !audioReady) {
      audioRef.current.play().then(() => {
        audioRef.current?.pause()
        setAudioReady(true)
      })
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      if (audioRef.current) {
        audioRef.current.play()
      }
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const handleStart = () => {
    addTime()
    prepareAudio() // Ensure audio is ready to play
    const totalSeconds = minutes * 60 + seconds
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds)
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(0)
    setMinutes(0)
    setSeconds(0)
    setSets(0) // Reset sets counter
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addTime = () => setSets((prev) => prev + 1)
  const removeTime = () => setSets((prev) => Math.max(prev - 1, 0))

  return (
    <Box>
      <Grid container justifyContent='center'>
        <Grid item sx={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant='h1'>Countdown Timer</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction='column'
        sx={{
          marginTop: '40px !important',
          textAlign: 'center',
        }}
      >
        <Grid item>
          <TextField
            label='Minutes'
            variant='filled'
            size='medium'
            type='number'
            value={minutes}
            onChange={(e) => setMinutes(Math.max(parseInt(e.target.value), 0))}
            disabled={isRunning}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '20px !important',
          }}
        >
          <TextField
            label='Seconds'
            variant='filled'
            size='medium'
            type='number'
            value={seconds}
            onChange={(e) => setSeconds(Math.max(parseInt(e.target.value), 0))}
            disabled={isRunning}
          />
        </Grid>
      </Grid>

      <Grid
        container
        direction='column'
        gap={3}
        sx={{
          marginTop: '40px !important',
          textAlign: 'center',
        }}
      >
        <Grid item>
          <Button
            size='large'
            onClick={handleStart}
            sx={{
              width: '100px',
              borderColor: 'green !important',
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkgreen',
                borderColor: 'darkgreen !important',
              },
            }}
          >
            Start
          </Button>
        </Grid>
        <Grid item>
          <Button
            size='large'
            onClick={handleStop}
            sx={{
              width: '100px',
              borderColor: 'orange !important',
              backgroundColor: 'orange',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkorange',
                borderColor: 'darkorange !important',
              },
            }}
          >
            Snooze
          </Button>
        </Grid>
        <Grid item>
          <Button
            size='large'
            onClick={handleReset}
            sx={{
              width: '100px',
              borderColor: 'red !important',
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
                borderColor: 'darkred !important',
              },
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent='center'
        sx={{
          marginTop: '40px !important',
        }}
      >
        <Typography variant='h1' sx={{ fontSize: '6rem !important' }}>
          {formatTime(timeLeft)}
        </Typography>
      </Grid>

      <Grid
        container
        justifyContent='center'
        sx={{
          marginTop: '40px !important',
        }}
      >
        <Button
          size='large'
          onClick={addTime}
          sx={{
            borderColor: 'green !important',
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgreen',
              borderColor: 'darkgreen !important',
            },
          }}
        >
          +
        </Button>
        <Button
          size='large'
          onClick={removeTime}
          sx={{
            borderColor: 'red !important',
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
              borderColor: 'darkred !important',
            },
            marginLeft: '40px',
          }}
        >
          -
        </Button>
      </Grid>

      <Grid
        container
        justifyContent='center'
        sx={{
          marginTop: '40px !important',
          marginBottom: '400px !important',
        }}
      >
        <Typography variant='h2'>Completed Sets: {sets}</Typography>
      </Grid>

      <audio
        ref={audioRef}
        src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      />
    </Box>
  )
}
