import Layout from '../components/layout'
import Header from '../components/recommender/header'
import Sliders from '../components/recommender/sliders'

const settings = [
   {
      name: 'Date Range (year)',
      description:
         'Filter out songs which were not released between the specified range ',
      min: 1900,
      defaultValue: [2000, 2023],
      max: 2023,
      step: 1,
   },
   {
      name: 'Accousticness',
      description:
         'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Danceability',
      description:
         'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Energy',
      description:
         'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Instrumentalness',
      description:
         'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Liveness',
      description:
         'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },

   {
      name: 'Loudness',
      description:
         'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.',
      min: -100,
      defaultValue: -50,
      max: 0,
   },
   {
      name: 'Mode',
      description:
         'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.',
      min: 0,
      defaultValue: 1,
      max: 1,
      step: 1,
   },
   {
      name: 'Speechiness',
      description:
         'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Tempo',
      description:
         'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Valence',
      description:
         'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Popularity',
      description:
         '0.0 indicates a song with the least amount of listeners and 1.0 indicates a song with the most amount of listeners ',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Accuracy',
      description:
         'How stricly your preferences shoud be applied to the generated playlist',
      min: 0,
      defaultValue: 50,
      max: 100,
   },
   {
      name: 'Minimum follower count',
      description: 'How stricly your preferences shoud be applied',
      min: 0,
      defaultValue: 100000,
      step: 1,
      max: 100000,
   },
   {
      name: 'Playlist size',
      description: 'How many tracks in the playlist',
      min: 0,
      defaultValue: 50,
      step: 1,
      max: 100000,
   },
]

const RecommenderPage = () => {
   return (
      <Layout>
         <div className="flex flex-col gap-5 p-10">
            <Header />
            <Sliders settings={settings} />
         </div>
      </Layout>
   )
}

export default RecommenderPage
