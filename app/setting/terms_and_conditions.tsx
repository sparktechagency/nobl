import { LogBox, ScrollView, View, useWindowDimensions } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import React from "react";
import RenderHtml from "react-native-render-html";
import { router } from "expo-router";
import tw from "@/lib/tailwind";

LogBox.ignoreAllLogs();

const terms_and_conditions = () => {
  const { width } = useWindowDimensions();
  const source = {
    html: `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions - [Your Company Name]</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #3498db;
            margin: 25px 0 15px;
            font-size: 1.4rem;
        }
        p, li {
            margin-bottom: 15px;
            font-size: 1rem;
        }
        ul {
            padding-left: 20px;
        }
        .last-updated {
            text-align: right;
            font-style: italic;
            color: #7f8c8d;
            margin-bottom: 30px;
        }
        .acceptance {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #3498db;
            margin: 20px 0;
        }
        @media (max-width: 768px) {
            body {
                padding: 15px;
            }
            h1 {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <h1>Terms and Conditions</h1>
    <p class="last-updated">Last Updated: [Insert Date]</p>

    <div class="acceptance">
        <p><strong>Please read these Terms and Conditions carefully before using our services.</strong> By accessing or using our website/mobile application, you agree to be bound by these Terms.</p>
    </div>

    <h2>1. Introduction</h2>
    <p>These Terms and Conditions ("Terms") govern your use of [Your Company Name]'s website located at [website URL] and our mobile application (collectively, the "Service"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>

    <h2>2. User Accounts</h2>
    <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
    <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Immediately notifying us of any unauthorized use of your account</li>
    </ul>

    <h2>3. Intellectual Property</h2>
    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. Our trademarks and trade dress may not be used without prior written permission.</p>

    <h2>4. Prohibited Activities</h2>
    <p>You agree not to:</p>
    <ul>
        <li>Use the Service for any illegal purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the Service</li>
        <li>Use any automated means to access the Service without permission</li>
        <li>Harass, abuse, or harm another person</li>
    </ul>

    <h2>5. Termination</h2>
    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>

    <h2>6. Limitation of Liability</h2>
    <p>In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of the Service.</p>

    <h2>7. Governing Law</h2>
    <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>

    <h2>8. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.</p>

    <h2>9. Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us at:</p>
    <p>[Your Company Name]<br>
    [Your Company Address]<br>
    Email: [Your Contact Email]<br>
    Phone: [Your Contact Number]</p>
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
        <RenderHtml contentWidth={width} source={source} />
      </ScrollView>
    </View>
  );
};

export default terms_and_conditions;
