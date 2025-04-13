import { LogBox, ScrollView, View, useWindowDimensions } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import React from "react";
import RenderHtml from "react-native-render-html";
import { router } from "expo-router";
import tw from "@/lib/tailwind";

LogBox.ignoreAllLogs();

const about_us = () => {
  const { width } = useWindowDimensions();
  const source = {
    html: `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - Company Name</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .about-container {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            margin-top: 30px;
        }
        .about-content {
            flex: 1;
            min-width: 300px;
        }
        .about-image {
            flex: 1;
            min-width: 300px;
            background: #f5f5f5;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-family: 'Poppins-Bold';
        }
        h2 {
            color: #3498db;
            margin: 25px 0 15px;
            font-family: 'Poppins-Bold';
        }
        p {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        .values-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 25px 0;
        }
        .value-card {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 15px;
            flex: 1;
            min-width: 200px;
            border-radius: 0 4px 4px 0;
        }
        @media (max-width: 768px) {
            .about-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <h1>About Our Company</h1>
    
    <div class="about-container">
        <div class="about-content">
            <h2>Our Story</h2>
            <p>Founded in 2010, [Company Name] began as a small team of passionate professionals dedicated to revolutionizing the [industry] sector. What started as a modest startup in [Location] has grown into an industry leader serving clients across [number] countries.</p>
            
            <h2>Our Mission</h2>
            <p>We exist to [core purpose]. Every day, we strive to [primary action] through innovative solutions, exceptional service, and unwavering commitment to our values. Our goal is not just to meet expectations, but to redefine what's possible in our field.</p>
            
            <h2>Our Values</h2>
            <div class="values-list">
                <div class="value-card">
                    <h3>Innovation</h3>
                    <p>We constantly push boundaries to deliver cutting-edge solutions that drive real results.</p>
                </div>
                <div class="value-card">
                    <h3>Integrity</h3>
                    <p>Honesty and transparency form the foundation of every client relationship.</p>
                </div>
                <div class="value-card">
                    <h3>Excellence</h3>
                    <p>We settle for nothing less than the highest standards in all we do.</p>
                </div>
            </div>
            
            <p>Today, our team of [number] professionals continues this tradition of excellence, combining decades of experience with fresh perspectives to help our clients navigate an ever-changing landscape.</p>
        </div>
        
        <div class="about-image">
            <img src="https://via.placeholder.com/500x600.png?text=Our+Team" alt="Our team working together" style="max-width: 100%; border-radius: 4px;">
        </div>
    </div>
</body>
</html>`,
  };
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`h-20 bg-primary`}>
        <BackWithComponent
          onPress={() => router.back()}
          title="About Us"
          togather
        />
      </View>
      <ScrollView
        style={tw`px-5`}
        contentContainerStyle={tw`py-10`}
        showsVerticalScrollIndicator={false}
      >
        <RenderHtml
          // baseStyle={tw`font-PoppinsRegular text-base my-10`}
          contentWidth={width}
          source={source}
        />
      </ScrollView>
    </View>
  );
};

export default about_us;
