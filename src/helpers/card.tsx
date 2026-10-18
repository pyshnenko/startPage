import React from 'react';
import Box from '@mui/material/Box';
import CardSurface from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { CardData } from '../types/frontTypes';

type CardProps = {
    data: CardData;
    darkMode: boolean;
    width: number;
};

export default function Card({ data, darkMode, width }: CardProps) {
    const palette = darkMode
        ? {
            background: 'rgba(25, 32, 51, 0.94)',
            border: 'rgba(174, 188, 220, 0.22)',
            title: '#F4F6FF',
            description: '#C2CBE0',
            accent: '#8CCBFF',
            shadow: '0 10px 28px rgba(0, 0, 0, 0.24)',
            hoverShadow: '0 18px 38px rgba(0, 0, 0, 0.34)',
            imageBackground: '#111827',
        }
        : {
            background: 'rgba(255, 255, 255, 0.92)',
            border: 'rgba(105, 119, 153, 0.18)',
            title: '#1D2940',
            description: '#58657C',
            accent: '#176FC1',
            shadow: '0 8px 24px rgba(36, 52, 88, 0.10)',
            hoverShadow: '0 16px 34px rgba(36, 52, 88, 0.17)',
            imageBackground: '#EDF2FA',
        };

    const compact = width <= 600;

    return (
        <CardSurface
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: compact ? 'column' : 'row',
                alignItems: 'stretch',
                width: compact ? 'min(100% - 24px, 420px)' : 'min(100% - 32px, 470px)',
                minWidth: 0,
                minHeight: compact ? 'auto' : 196,
                margin: '10px',
                padding: '10px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                color: palette.title,
                background: palette.background,
                border: `1px solid ${palette.border}`,
                borderRadius: '22px !important',
                boxShadow: palette.shadow,
                backdropFilter: 'blur(18px)',
                transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: palette.hoverShadow,
                    borderColor: darkMode ? 'rgba(140, 203, 255, .42)' : 'rgba(23, 111, 193, .28)',
                },
                '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    '&:hover': { transform: 'none' },
                },
            }}
        >
            <CardActionArea
                onClick={() => window.location.assign(data.href)}
                aria-label={`Открыть проект: ${data.title}`}
                sx={{
                    display: 'flex',
                    flexDirection: compact ? 'column' : 'row',
                    alignItems: 'stretch',
                    textAlign: 'left',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    '&:hover .ar-card-image': { transform: 'scale(1.035)' },
                    '&:hover': { backgroundColor: 'transparent' },
                }}
            >
                <CardMedia
                    component="img"
                    className="ar-card-image"
                    image={data.pict}
                    alt={data.title}
                    sx={{
                        width: compact ? '100%' : 166,
                        minWidth: compact ? 0 : 166,
                        height: compact ? 190 : 174,
                        objectFit: 'cover',
                        flexShrink: 0,
                        borderRadius: '15px',
                        backgroundColor: palette.imageBackground,
                        transition: 'transform 220ms ease',
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1 1 auto',
                    minWidth: 0,
                    padding: compact ? '14px 6px 4px' : '8px 8px 4px 16px',
                }}>
                    <CardContent sx={{ padding: '0 !important', minWidth: 0 }}>
                        <Typography
                            component="h2"
                            sx={{
                                color: palette.title,
                                fontSize: '1.05rem',
                                fontWeight: 750,
                                lineHeight: 1.3,
                                overflowWrap: 'anywhere',
                                marginBottom: '9px',
                            }}
                        >
                            {data.title}
                        </Typography>
                        <Typography
                            sx={{
                                color: palette.description,
                                fontSize: '.94rem',
                                lineHeight: 1.55,
                                overflowWrap: 'anywhere',
                            }}
                        >
                            {data.text}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', padding: '12px 0 0 !important' }}>
                        <Button
                            component="span"
                            endIcon={<ArrowOutwardRoundedIcon />}
                            sx={{
                                color: palette.accent,
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                borderRadius: '11px',
                                padding: '7px 10px',
                                '&:hover': {
                                    backgroundColor: darkMode ? 'rgba(140,203,255,.10)' : 'rgba(23,111,193,.08)',
                                },
                            }}
                        >
                            Попробовать
                        </Button>
                    </CardActions>
                </Box>
            </CardActionArea>
        </CardSurface>
    );
}
