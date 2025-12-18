import React from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";

export default function CastCard({ cast }) {
  const profileImg = cast.profile_path
    ? `https://image.tmdb.org/t/p/w300/${cast.profile_path}`
    : img;

  return (
    <Card sx={{ width: 200, marginRight: "16px" }}>
      <CardHeader
        title={
          <Typography variant="h6" component="p" noWrap>
            {cast.name}
          </Typography>
        }
        subheader={cast.character}
      />
      <Link to={`/person/${cast.id}`}>
        <CardMedia
          sx={{ height: 250 }}
          image={profileImg}
          title={cast.name}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {cast.known_for_department || "Acting"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/person/${cast.id}`}>
          <Typography variant="body2" color="primary">
            View Actor →
          </Typography>
        </Link>
      </CardActions>
    </Card>
  );
}
