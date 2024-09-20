import { View, Text, TouchableOpacity, Image } from "react-native";


const JobInfoCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity onPress={handleNavigate} className="bg-primary-background flex flex-col my-1 border rounded-lg border-primary-purple">
      <View className="flex flex-row items-center my-1 mx-2">
      <View>
        <Image
          source={{
            uri: `${job.employer_logo}`
          }}
          width={90}
          height={80}
          resizeMode='contain'
        />
      </View>
      <View className="flex flex-col justify-evenly mx-1 ml-4">
        <Text className="font-pbold text-ms mr-20">
          {job?.job_title}
        </Text>
        <View className="flex flex-col">
        <Text className="font-pmedium" numberOfLines={1}>
          {job?.employer_name}
        </Text></View>
        <View className="flex flex-row mt-1">
        <Text numberOfLines={1}>
          {job.job_employment_type}
        </Text>
        <Text className="mx-8" numberOfLines={1}>
          {job.job_country}
        </Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobInfoCard;